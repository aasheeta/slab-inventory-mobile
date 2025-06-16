import React, { useState } from 'react';
import './BundleRegister.css';
import axios from 'axios';
import Select from 'react-select';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from "../api"

const BundleRegister = () => {
     const { token } = useAuth();
     const navigate = useNavigate();
    const [supplier, setSupplier] = useState({ value: 'slabware', label: 'SLABWARE' });
    const [material, setMaterial] = useState(null);
    const [quality, setQuality] = useState(null);
    const [thickness, setThickness] = useState(null);
    const [finish, setFinish] = useState(null);
    const [block, setBlock] = useState('');
    const [bundle, setBundle] = useState('');
    const [isSelf, setIsSelf] = useState(false);
    const [priceSqMt, setPriceSqMt] = useState('');
    const [priceSqFt, setPriceSqFt] = useState('');
    const [oldPriceSqMt, setOldPriceSqMt] = useState('');
    const [oldPriceSqFt, setOldPriceSqFt] = useState('');
    const [tags, setTags] = useState([]);
    const [availability, setAvailability] = useState('available');

    // Static options
    const supplierOptions = [
        { value: 'slabware', label: 'SLABWARE' },
        { value: 'granite_inc', label: 'Granite Inc.' },
        { value: 'add_new', label: '+ Add New Supplier' }, // new option
    ];

    const materialOptions = [
        { value: 'granite', label: 'Granite' },
        { value: 'marble', label: 'Marble' },
        { value: 'quartz', label: 'Quartz' },
        { value: 'add_new', label: '+ Add New Material' },

    ];

    const qualityOptions = [
        { value: 'premium', label: 'Premium' },
        { value: 'standard', label: 'Standard' },
        { value: 'economy', label: 'Economy' },
    ];

    const thicknessOptions = [
        { value: '20mm', label: '20mm' },
        { value: '30mm', label: '30mm' },
        { value: '40mm', label: '40mm' },
    ];

    const finishOptions = [
        { value: 'polished', label: 'Polished' },
        { value: 'honed', label: 'Honed' },
        { value: 'leathered', label: 'Leathered' },
    ];

    const tagOptions = [
        { value: 'new', label: 'New' },
        { value: 'featured', label: 'Featured' },
        { value: 'discount', label: 'Discount' },
    ];

    const handleSave = async () => {
        const bundleData = {
            supplier: supplier.value,
            material: material?.value,
            quality: quality?.value,
            thickness: thickness?.value,
            finish: finish?.value,
            block,
            bundle,
            isSelf,
            priceSqMt,
            priceSqFt,
            oldPriceSqMt,
            oldPriceSqFt,
            tags: tags.map(t => t.value),
            availability,
        };

        try {
            // const res = await fetch('http://localhost:5000/api/bundles', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(bundleData)
            // });
            const res  = await API.post('/api/bundles', bundleData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');

                alert('Bundle registered successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [newSupplier, setNewSupplier] = useState({
        name: '',
        telephone: '',
        address: '',
        type: ''
    });

    const handleSupplierChange = (selectedOption) => {
        if (selectedOption.value === 'add_new') {
            setShowSupplierModal(true);
        } else {
            setSupplier(selectedOption);
        }
    };

    const handleSaveSupplier = () => {
        if (!newSupplier.name.trim()) {
            alert("Supplier Name is required!");
            return;
        }

        const createdSupplier = {
            value: newSupplier.name.toLowerCase().replace(/\s+/g, '_'),
            label: newSupplier.name
        };

        supplierOptions.splice(supplierOptions.length - 1, 0, createdSupplier);
        setSupplier(createdSupplier);
        setNewSupplier({ name: '', telephone: '', address: '', type: '' });
        setShowSupplierModal(false);
    };

    const [showMaterialModal, setShowMaterialModal] = useState(false);
    const [materialError, setMaterialError] = useState('');
    const [newMaterial, setNewMaterial] = useState({
        name: '',
        type: '',
        color: '',
    });
    const handleMaterialChange = (selectedOption) => {
        if (selectedOption.value === 'add_new') {
            setShowMaterialModal(true);
        } else {
            setMaterial(selectedOption);
        }
    };
    const handleSaveMaterial = () => {
        if (!newMaterial.name.trim()) {
            alert("Material Name is required!");
            return;
        }

        const createdMaterial = {
            value: newMaterial.name.toLowerCase().replace(/\s+/g, '_'),
            label: newMaterial.name
        };

        materialOptions.splice(materialOptions.length - 1, 0, createdMaterial);
        setMaterial(createdMaterial);
        setNewMaterial({ name: '', telephone: '', address: '', type: '' });
        setShowMaterialModal(false);
    };


    return (
        
        <div className="register-container">
            <div className="register-header">
                <h1>Register Bundle</h1>
                <div className="button-group">
                    <button className="btn-back">To go back</button>
                    <button className="btn-save" onClick={handleSave}>Save</button>
                </div>
            </div>

            <div className="register-content">
                <div className="left-panel">
                    <div className="section-header">
                        <h2>Information</h2>
                        <button className="btn-advanced">Advanced ▾</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="supplier">
                            Supplier <span className="required">*</span>
                        </label>
                        <Select
                            id="supplier"
                            options={supplierOptions}
                            value={supplier}
                            onChange={handleSupplierChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="material">
                            Material <span className="required">*</span>
                        </label>
                        <Select
                            id="material"
                            options={materialOptions}
                            value={material}
                            onChange={handleMaterialChange}
                        />

                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="quality">
                                Quality <span className="required">*</span>
                            </label>
                            <Select
                                id="quality"
                                options={qualityOptions}
                                value={quality}
                                onChange={setQuality}
                                // className="form-select"
                                placeholder="Select Quality"
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="thickness">
                                Thickness <span className="required">*</span>
                            </label>
                            <Select
                                id="thickness"
                                options={thicknessOptions}
                                value={thickness}
                                onChange={setThickness}
                                // className="form-select"
                                placeholder="Select Thickness"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="finish">Finish</label>
                        <Select
                            id="finish"
                            options={finishOptions}
                            value={finish}
                            onChange={setFinish}
                            placeholder="Select Finish"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="block">Block</label>
                            <input
                                type="text"
                                id="block"
                                className="form-input"
                                value={block}
                                onChange={(e) => setBlock(e.target.value)}
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="bundle">Bundle</label>
                            <input
                                type="text"
                                id="bundle"
                                className="form-input"
                                value={bundle}
                                onChange={(e) => setBundle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <div className="checkbox-container">
                                <label htmlFor="priceSqMt">Price (Sq.Mt.)</label>
                                <div style={{ display: "flex", gap: '5px' }}>
                                    <input
                                        type="checkbox"
                                        id="self"
                                        checked={isSelf}
                                        onChange={() => setIsSelf(!isSelf)}
                                    />
                                    <label htmlFor="self">Self.</label>
                                </div>
                            </div>
                            <input
                                type="text"
                                id="priceSqMt"
                                className="form-input"
                                value={priceSqMt}
                                onChange={(e) => setPriceSqMt(e.target.value)}
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="priceSqFt">Price (Sq.Ft.)</label>
                            <input
                                type="text"
                                id="priceSqFt"
                                className="form-input"
                                value={priceSqFt}
                                onChange={(e) => setPriceSqFt(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="oldPriceSqMt">Old Price (Sq.Mt.)</label>
                            <input
                                type="text"
                                id="oldPriceSqMt"
                                className="form-input"
                                value={oldPriceSqMt}
                                onChange={(e) => setOldPriceSqMt(e.target.value)}
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="oldPriceSqFt">Old Price (Sq.Ft.)</label>
                            <input
                                type="text"
                                id="oldPriceSqFt"
                                className="form-input"
                                value={oldPriceSqFt}
                                onChange={(e) => setOldPriceSqFt(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <Select
                            id="tags"
                            options={tagOptions}
                            value={tags}
                            onChange={setTags}
                            isMulti
                            placeholder="Select Tags"
                        />
                    </div>

                    <div className="form-group">
                        <label>Availability</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    value="available"
                                    checked={availability === 'available'}
                                    onChange={(e) => setAvailability(e.target.value)}
                                />
                                Available
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="on_hold"
                                    checked={availability === 'on_hold'}
                                    onChange={(e) => setAvailability(e.target.value)}
                                />
                                On Hold
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="sold"
                                    checked={availability === 'sold'}
                                    onChange={(e) => setAvailability(e.target.value)}
                                />
                                Sold
                            </label>
                        </div>
                    </div>
                </div>

                <div className="right-panel">
                    <div className="photos-section">
                        <div className="section-header">
                            <h2>Bundle Photos</h2>
                            <div className="photo-buttons">
                                <button className="btn-photo">
                                    <span className="icon">⬇</span> Photo Zip File
                                </button>
                                <button className="btn-select-photos">
                                    <span className="icon">📷</span> Select Photos
                                </button>
                            </div>
                        </div>
                        <p className="max-size">Maximum Size: 10 MB</p>
                        <div className="photo-upload-area">
                            <p className="no-photos">No Photos Attached</p>
                        </div>
                    </div>

                    <div className="statistic-section">
                        <h2>Statistic</h2>
                        <div className="stats-container">
                            <div className="stats-column">
                                <h3>Info</h3>
                                <div className="stat-item">
                                    <span>Slabs:</span>
                                    <span>0</span>
                                </div>
                                <div className="stat-item">
                                    <span>Days Stock:</span>
                                    <span>0</span>
                                </div>
                                <div className="stat-item">
                                    <span>Bundle Price Sq.Mt.:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="stat-item">
                                    <span>Weight/M²:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="stat-item">
                                    <span>Bundle Price Sq.Ft.:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="stat-item">
                                    <span>Average Weight/M²:</span>
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div className="stats-column">
                                <h3>Cost</h3>
                                <div className="stat-item">
                                    <span>Cost Sq.Mt.:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="stat-item">
                                    <span>Cost Sq.Ft.:</span>
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div className="stats-column">
                                <h3>Total</h3>
                                <div className="stat-item">
                                    <span>Total Sq.Mt.:</span>
                                    <span>0.000</span>
                                </div>
                                <div className="stat-item">
                                    <span>Total Sq.Ft.:</span>
                                    <span>0.000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showSupplierModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Supplier</h3>
                        <div className="modal-field">
                            <label>Supplier Name <span className="required">*</span></label>
                            <input
                                type="text"
                                value={newSupplier.name}
                                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Telephone</label>
                            <input
                                type="text"
                                value={newSupplier.telephone}
                                onChange={(e) => setNewSupplier({ ...newSupplier, telephone: e.target.value })}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Address</label>
                            <input
                                type="text"
                                value={newSupplier.address}
                                onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Type</label>
                            <input
                                type="text"
                                value={newSupplier.type}
                                onChange={(e) => setNewSupplier({ ...newSupplier, type: e.target.value })}
                            />
                        </div>

                        <div className="modal-buttons">
                            <button onClick={() => setShowSupplierModal(false)} className="btn-cancel">Cancel</button>
                            <button onClick={handleSaveSupplier} className="btn-save">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showMaterialModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Material</h3>
                        <div className="modal-field">
                            <label>Material Name <span className="required">*</span></label>
                            <input
                                type="text"
                                value={newMaterial.name}
                                onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Type</label>
                            <input
                                type="text"
                                value={newMaterial.type}
                                onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Color</label>
                            <input
                                type="text"
                                value={newMaterial.color}
                                onChange={(e) => setNewMaterial({ ...newMaterial, color: e.target.value })}
                            />
                        </div>
                        <div className="modal-buttons">
                            <button className="btn-cancel" onClick={() => setShowMaterialModal(false)}>Cancel</button>
                            <button className="btn-save" onClick={handleSaveMaterial}>Save</button>
                        </div>
                    </div>
                </div>
            )}



        </div>
      
    );
};

export default BundleRegister;