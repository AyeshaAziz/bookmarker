const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app'); // root of your components

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.component.ts') && !file.endsWith('.spec.ts')) {
      const specFile = fullPath.replace('.ts', '.spec.ts');

      if (!fs.existsSync(specFile)) {
        const componentName = path.basename(file, '.component.ts');
        const className = componentName
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join('') + 'Component';

        const content = `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${className} } from './${componentName}.component';

describe('${className}', () => {
  let component: ${className};
  let fixture: ComponentFixture<${className}>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [${className}]
    }).compileComponents();

    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;

        fs.writeFileSync(specFile, content);
        console.log(`Created spec: ${specFile}`);
      }
    }
  });
}

walkDir(appDir);
