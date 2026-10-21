"""Buildless site: check local references, labels, IDs and structured data."""
from pathlib import Path
from html.parser import HTMLParser
import json

root = Path(__file__).parent / 'dist'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.refs=[]; self.labels=[]; self.fields=[]; self.errors=[]; self.h1=0; self.schema=False; self.data=''
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='h1': self.h1+=1
        if tag=='label' and 'for' in a: self.labels.append(a['for'])
        if tag in ('input','select','textarea') and a.get('type')!='radio': self.fields.append(a.get('id'))
        if tag=='img' and 'alt' not in a: self.errors.append('Image without alt')
        for key in ('src','href'):
            if a.get(key): self.refs.append(a[key])
        if tag=='script' and a.get('type')=='application/ld+json': self.schema=True
    def handle_data(self,data):
        if self.schema: self.data+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.schema:
            json.loads(self.data); self.schema=False

p=Page(); p.feed((root/'index.html').read_text(encoding='utf-8'))
assert not p.errors, p.errors
assert len(p.ids)==len(set(p.ids)), 'Duplicate IDs'
assert p.h1==1, 'Expected one H1'
assert all(f in p.labels for f in p.fields), 'Unlabelled fields'
for ref in p.refs:
    if ref.startswith('#'): assert ref[1:] in p.ids, f'Missing target: {ref}'
    elif not ref.startswith(('http:','https:','tel:','mailto:','data:')):
        assert (root/ref.split('?')[0]).is_file(), f'Missing asset: {ref}'
assert 'Tuğçe Akman' not in (root/'index.html').read_text(encoding='utf-8')
print(f'PASS: {len(p.refs)} references, {len(p.fields)} labelled controls, unique IDs, H1, alt text and JSON-LD')
