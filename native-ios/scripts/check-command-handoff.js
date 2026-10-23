// Read-only regression checks for the existing JARVIS command handoff.
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.resolve(__dirname,'../../index.html'),'utf8');
const assertions = [
  ['Voice reply button present', html.includes('id="readLocalReply"')],
  ['Voice reply requires user action', html.includes("$('readLocalReply').addEventListener('click'")],
  ['Voice reply requires speech enabled', html.includes("if(!voiceEnabled){status('STIMME AUS'")],
  ['Voice reply uses received text and length limit', html.includes("speakJarvis(reply.slice(0,1800))")],
  ['Copy control exists', html.includes('id="copyApprovedCmd"')],
  ['Copy uses the approved text', html.includes('navigator.clipboard.writeText(approvedCommand)')],
  ['Command edits invalidate approval', html.includes("cmd.addEventListener('input',()=>{approvedCommand='';$('approveCmd').hidden=true;$('copyApprovedCmd').hidden=true;")],
  ['One-tap waits for successful clipboard copy before navigation', (() => {const begin=html.indexOf("$('copyOpenGPT').addEventListener");const end=html.indexOf("cmd.addEventListener('input'",begin);if(begin<0||end<0)return false;const body=html.slice(begin,end);return body.indexOf("await navigator.clipboard.writeText(approvedCommand)")>=0&&body.indexOf("await navigator.clipboard.writeText(approvedCommand)")<body.indexOf("window.location.assign('https://chatgpt.com/')")&&body.includes("catch(_){msg('Kopieren fehlgeschlagen. ChatGPT wurde nicht geöffnet.')")})()],
  ['One-tap opens ChatGPT without command in URL', html.includes("window.location.assign('https://chatgpt.com/')")],
  ['One-tap button invalidated when command changes', html.includes("$('copyOpenGPT').hidden=true;")],
  ['No automatic command submit in copy handler', !html.slice(html.indexOf("$('copyApprovedCmd').addEventListener"),html.indexOf("cmd.addEventListener('input'")).includes('openGPT(')],
];
for(const [name,passed] of assertions) { console.log((passed?'PASS ':'FAIL ')+name); if(!passed)process.exitCode=1; }
