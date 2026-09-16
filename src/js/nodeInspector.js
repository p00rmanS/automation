// Interactive: Node Inspector — Resource -> Operation -> Execute step (n8n tab)
const NODE_INSPECTOR = {
    'File': {
        ops: ['Read File', 'Write File to Disk', 'Delete File'],
        outputs: {
            'Read File': { ok: true, text: 'OUTPUT — 1 item\nFile Name: report.pdf\nMime Type: application/pdf\nFile Size: 240 KB' },
            'Write File to Disk': { ok: false, text: 'ERROR — Problem in node \'Read/Write Files from Disk\'\nError code: ENOENT\nFull message: ENOENT: no such file or directory, open \'/local-files/Test_vid.mp4\'\n\nFix: the /local-files/ folder doesn\'t exist yet, or the Input Binary Field name doesn\'t match the field the previous node actually produced.' },
            'Delete File': { ok: true, text: 'OUTPUT — 1 item\n{ "deleted": true, "path": "/local-files/old-report.pdf" }' }
        }
    },
    'Message': {
        ops: ['Send', 'Get Many', 'Delete'],
        outputs: {
            'Send': { ok: true, text: 'OUTPUT — 1 item\n{ "ok": true, "channel": "#sales", "ts": "1737000000.123" }' },
            'Get Many': { ok: true, text: 'OUTPUT — 3 items\n[{"text":"New lead!"}, {"text":"Deal closed"}, {"text":"Reminder"}]' },
            'Delete': { ok: true, text: 'OUTPUT — 1 item\n{ "ok": true, "deleted": true }' }
        }
    },
    'Solar Flare Data': {
        ops: ['Get', 'Get Many'],
        outputs: {
            'Get': { ok: true, text: 'OUTPUT — 1 item\n{ "flrID": "2026-09-01T12:34:00-FLR-001", "classType": "M2.1", "beginTime": "2026-09-01T12:34Z" }' },
            'Get Many': { ok: true, text: 'OUTPUT — 4 items\n[{"flrID":"...FLR-001"}, {"flrID":"...FLR-002"}, {"flrID":"...FLR-003"}, {"flrID":"...FLR-004"}]' }
        }
    },
    'Contact': {
        ops: ['Create', 'Update', 'Get'],
        outputs: {
            'Create': { ok: true, text: 'OUTPUT — 1 item\n{ "id": "ct_88213", "email": "lead@example.com", "created": true }' },
            'Update': { ok: true, text: 'OUTPUT — 1 item\n{ "id": "ct_88213", "updated": true }' },
            'Get': { ok: true, text: 'OUTPUT — 1 item\n{ "id": "ct_88213", "email": "lead@example.com" }' }
        }
    }
};

export function updateNodeInspectorResource() {
    const resource = document.getElementById('niResource').value;
    const opSelect = document.getElementById('niOperation');
    opSelect.innerHTML = '';
    NODE_INSPECTOR[resource].ops.forEach(op => {
        const opt = document.createElement('option');
        opt.value = op;
        opt.textContent = op;
        opSelect.appendChild(opt);
    });
    document.getElementById('niOutput').innerHTML = '<span style="color:#a0a0a0;">Click "Execute step" to run this node...</span>';
}

export function executeNodeInspector() {
    const resource = document.getElementById('niResource').value;
    const operation = document.getElementById('niOperation').value;
    const result = NODE_INSPECTOR[resource].outputs[operation];
    const box = document.getElementById('niOutput');
    box.style.borderColor = result.ok ? '#00d4ff44' : '#ff4d4d66';
    box.style.color = result.ok ? '#00ffff' : '#ff8080';
    box.innerHTML = '<pre style="white-space: pre-wrap; font-family: \'JetBrains Mono\', monospace; margin: 0;">' + result.text + '</pre>';
}
