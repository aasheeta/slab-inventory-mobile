import React from 'react';
import './BundleSettings.css';

const qualityList = [
  { name: 'Commercial', outlet: 'No' },
  { name: 'First', outlet: 'No' },
  { name: 'High Standard', outlet: 'No' },
  { name: 'Premium', outlet: 'No' },
  { name: 'Remnant', outlet: 'Yes' },
  { name: 'Standard', outlet: 'No' },
];

const finishList = ['Brushed', 'Flamed', 'honed', 'Mesh on Back', 'polished', 'Test1'];
const thicknessList = ['2cm', '3cm', '5cm'];
const altPriceList = ['Retail', 'Wholesale'];
const costList = ['Material Cost', 'Labor Cost'];
const processList = ['Sealed', 'Tumbled'];

const TableSection = ({ title, items, showOutlet = false }) => (
  <div className="settings-table-card">
    <div className="table-header">
      <h3>{title}</h3>
      <span>Total {items.length}</span>
      <button className="new-btn">+ New</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          {showOutlet && <th>Outlet</th>}
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) =>
          typeof item === 'object' ? (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.outlet}</td>
              <td>
                <button className="icon-btn">✏️</button>
                <button className="icon-btn">🗑️</button>
              </td>
            </tr>
          ) : (
            <tr key={index}>
              <td>{item}</td>
              {showOutlet && <td></td>}
              <td>
                <button className="icon-btn">✏️</button>
                <button className="icon-btn">🗑️</button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

const BundleSettings = () => {
  return (
    <div className="bundle-settings-container">
      <h2 className="page-title">Bundle Settings</h2>

      {/* Top Config */}
      <div className="settings-row">
        <div className="settings-card">
          <h3>New Arrivals</h3>
          <p>Days a bundle will remain as “Newly Arrived”.</p>
          <input type="number" defaultValue={5} />
          <button className="save-btn">Save</button>
        </div>

        <div className="settings-card">
          <h3>Importing Bundles and Sheets</h3>
          <p>
            SlabWare has improved its import experience. <br />
            Visit the new import page by clicking below and let us know how you feel about it.
          </p>
          <button className="import-btn">Import Page</button>
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-card">
          <h3>Watermark Configuration</h3>
          <p>If you want to configure your watermark settings, click here.</p>
          <button className="link-btn">Go to Settings</button>
        </div>

        <div className="settings-card">
          <h3>Label Configuration</h3>
          <p>If you want to configure your tag settings, click here.</p>
          <button className="link-btn">Go to Settings</button>
        </div>
      </div>

      {/* Settings Tables */}
      <div className="settings-row">
        <TableSection title="Quality" items={qualityList} showOutlet={true} />
        <TableSection title="Finish" items={finishList} />
      </div>

      <div className="settings-row">
        <TableSection title="Thickness" items={thicknessList} />
        <TableSection title="Alternative Price" items={altPriceList} />
      </div>

      <div className="settings-row">
        <TableSection title="Cost" items={costList} />
        <TableSection title="Applied Process" items={processList} />
      </div>

      <button className="back-btn">To go back</button>
    </div>
  );
};

export default BundleSettings;
