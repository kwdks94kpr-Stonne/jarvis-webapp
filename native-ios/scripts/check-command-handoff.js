// Read-only regression checks for the existing JARVIS command handoff.
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.resolve(__dirname,'../../index.html'),'utf8');
const assertions = [
  ['Copy control exists', html.includes('id="copyApprovedCmd"')],
  ['Copy uses the approved text', html.includes('navigator.clipboard.writeText(approvedCommand)')],
  ['Command edits invalidate approval', html.includes("cmd.addEventListener('input',()=>{approvedCommand='';$('approveCmd').hidden=true;$('copyApprovedCmd').hidden=true;")],
  ['One-tap opens ChatGPT without command in URL', html.includes("window.location.assign('https://chatgpt.com/')")],
  ['One-tap button invalidated when command changes', html.includes("$('copyOpenGPT').hidden=true;")],
  ['No automatic command submit in copy handler', !html.slice(html.indexOf("$('copyApprovedCmd').addEventListener"),html.indexOf("cmd.addEventListener('input'")).includes('openGPT(')],
];
for(const [name,passed] of assertions) { console.log((passed?'PASS ':'FAIL ')+name); if(!passed)process.exitCode=1; }
