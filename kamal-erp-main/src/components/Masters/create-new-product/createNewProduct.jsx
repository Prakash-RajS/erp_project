import React, { useState, useEffect, useRef } from "react";
import "./createNewProduct.css";
import CategoryInput from "./customInput";
import CustomCheckboxInput from "./customCheckboxInput";
import { toast } from "react-toastify";
import NewproductCategory from "../newproductCategory/newproductCategory";
import NewproductTaxCode from "../newproduct-tax-code/newproductTaxCode";
import NewproductUOM from "../newproduct-uom/newproductUOM";
import NewproductWarehouse from "../newproductWarehouse/newproductWarehouse";
import NewproductSupplier from "../newproductSupplier/newproductSupplier";
import NewproductSize from "../newproductSize/newproductSize";
import NewproductColor from "../newproductColor/newproductColor";

export default function createNewProduct({
  setshowNewProduct,
  editNewProduct,
  editProduct,
  setEditProduct,
}) {
  const [ApiCustomdata, setApiCustomdata] = useState({});
  const [categoryApi, setcategoryApi] = useState([]);
  const [tax_codeApi, settax_codeAip] = useState([]);
  const [uomApi, setuomApi] = useState([]);
  const [warehouseApi, setwarehouseApi] = useState([]);
  const [sizeApi, setsizeApi] = useState([]);
  const [colorApi, setcolorApi] = useState([]);
  const [supplierApi, setsupplierApi] = useState([]);
  const [related_productsApi, setrelated_productsApi] = useState([]);

  // Add new custom box

  //tax-code
  const [newproduct_tax_code, setnewproduct_tax_code] = useState(false);
  const [newproduct_edit_tax_code, setnewproduct_edit_tax_code] =
    useState(false);
  //uon
  const [newProductUOM, setnewProductUOM] = useState(false);
  const [editNewproductUOM, seteditNewproductUOM] = useState(false);
  //warehouse
  const [newproductWarehouse, setnewproductWarehouse] = useState(false);
  const [editnewproductWarehouse, setEditnewproductWarehouse] = useState(false);
  //supplier
  const [newproductSupplier, setnewproductSupplier] = useState(false);
  const [editnewproductSupplier, setEditnewproductSupplier] = useState(false);
  //size
  const [newproductSize, setnewproductSize] = useState(false);
  const [editnewproductSize, setEditnewproductSize] = useState(false);
  //color
  const [newproductColor, setnewproductColor] = useState(false);
  const [editnewproductColor, setEditnewproductColor] = useState(false);
  //category
  const [newproductCategory, setnewproductCategory] = useState(false);
  const [editnewproductCategory, setEditnewproductCategory] = useState(false);

  const [newProductImage, setnewProductImage] = useState(true);
  const [imageURL, setImageURL] = useState("");

  const inputRef = useRef(0);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImageURL(preview); // Save preview to state
      toast.success("Product image uploaded successfully");
      setnewProductImage(false);
    }
  };

  const [newProductcustom, setnewProductCustom] = useState({
    category: "",
    tax_code: "",
    uom: "",
    warehouse: "",
    size: "",
    color: "",
    supplier: "",
    related_products: [],
  });

  const [newProductData, setnewProductData] = useState({
    product_id: "",
    product_name: "",
    product_type: "",
    description: "",
    category: "",
    tax_code: "",
    unit_price: "",
    discount: "",
    uom: "",
    quantity: "",
    stock_level: "",
    reorder_level: "",
    warehouse: "",
    size: "",
    color: "",
    weight: "",
    specifications: "",
    supplier: "",
    status: "",
    product_usage: "",
    related_products: [],
    sub_category: "",
  });

  const dropDownData = {
    categoryApi: ["Electronics", "Fashon", "Grocery"],
    tax_codeApi: ["GST-18%", "no Tax"],
    uomApi: ["box(12)", "Set(45)"],
    warehouseApi: ["main Warehouse"],
    sizeApi: ["small", "large", "medium"],
    colorApi: ["black", "yellow", "red"],
    supplierApi: ["abc.pvt.LTD", "qwe.pvt.LTD"],
    related_productsApi: ["Earbuds", "Bluetooth", "Speaker"],
  };
  useEffect(() => {
    setApiCustomdata(dropDownData);
  }, []);
  useEffect(() => {
    if (Object.keys(ApiCustomdata).length > 0) {
      setcategoryApi(ApiCustomdata.categoryApi);
      settax_codeAip(ApiCustomdata.tax_codeApi);
      setuomApi(ApiCustomdata.uomApi);
      setwarehouseApi(ApiCustomdata.warehouseApi);
      setsizeApi(ApiCustomdata.sizeApi);
      setcolorApi(ApiCustomdata.colorApi);
      setsupplierApi(ApiCustomdata.supplierApi);
      setrelated_productsApi(ApiCustomdata.related_productsApi);
    }
  }, [ApiCustomdata]);

  const handleCustomChange = (e) => {
    const { id, value } = e.target;

    setnewProductData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (value !== "Custom") {
      setnewProductCustom((prev) => ({
        ...prev,
        [`custom_${id}`]: "",
      }));
    }
  };

  const handleNewProjectDataChange = (e) => {
    setnewProductData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleNewProjectCustomData = (e) => {
    setnewProductCustom((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  useEffect(() => {
    setnewProductData((prev) => {
      return { ...prev, ...editProduct };
    });
    setnewProductCustom((prev) => {
      return { ...prev, ...editProduct };
    });
  }, [editProduct]);

  function handleNewProductSubmit(e) {
    e.preventDefault();
    setnewProductData({
      product_id: "",
      product_name: "",
      product_type: "",
      description: "",
      category: "",
      tax_code: "",
      unit_price: "",
      discount: "",
      uom: "",
      quantity: "",
      stock_level: "",
      reorder_level: "",
      warehouse: "",
      size: "",
      color: "",
      weight: "",
      specifications: "",
      supplier: "",
      status: "",
      product_usage: "",
      related_products: "",
      sub_category: "",
    });
    setnewProductCustom({
      category: "",
      tax_code: "",
      uom: "",
      warehouse: "",
      size: "",
      color: "",
      supplier: "",
      related_products: "",
    });
    setImageURL([]);
    setshowNewProduct(false);
  }
  function handleNewProductReset(e) {
    e.preventDefault();
    setnewProductData({
      product_id: "",
      product_name: "",
      product_type: "",
      description: "",
      category: "",
      tax_code: "",
      unit_price: "",
      discount: "",
      uom: "",
      quantity: "",
      stock_level: "",
      reorder_level: "",
      warehouse: "",
      size: "",
      color: "",
      weight: "",
      specifications: "",
      supplier: "",
      status: "",
      product_usage: "",
    });
    setnewProductCustom({
      category: "",
      tax_code: "",
      uom: "",
      warehouse: "",
      size: "",
      color: "",
      supplier: "",
    });
    setImageURL([]);
    setshowNewProduct(false);
  }
  console.log(newProductData);
  console.log(newProductcustom);

  return (
    <>
      {newproductCategory && (
        <div className="product-bg-autoheight-btn">
          <NewproductCategory
            newproductCategory={newproductCategory}
            setnewproductCategory={setnewproductCategory}
            editnewproductCategory={editnewproductCategory}
            setEditnewproductCategory={setEditnewproductCategory}
            editDropDown={dropDownData.categoryApi}
          />
        </div>
      )}
      {editnewproductCategory && (
        <div className="product-bg-autoheight-btn">
          <NewproductCategory
            newproductCategory={newproductCategory}
            setnewproductCategory={setnewproductCategory}
            editnewproductCategory={editnewproductCategory}
            setEditnewproductCategory={setEditnewproductCategory}
            editDropDown={dropDownData.categoryApi}
          />
        </div>
      )}
      {newproduct_tax_code && (
        <div className="product-bg-btn">
          <NewproductTaxCode
            newproduct_tax_code={newproduct_tax_code}
            setnewproduct_tax_code={setnewproduct_tax_code}
            setnewproduct_edit_tax_code={setnewproduct_edit_tax_code}
            newproduct_edit_tax_code={newproduct_edit_tax_code}
            editDropDown={dropDownData.tax_codeApi}
          />
        </div>
      )}
      {newproduct_edit_tax_code && (
        <div className="product-bg-btn">
          <NewproductTaxCode
            newproduct_tax_code={newproduct_tax_code}
            setnewproduct_tax_code={setnewproduct_tax_code}
            setnewproduct_edit_tax_code={setnewproduct_edit_tax_code}
            newproduct_edit_tax_code={newproduct_edit_tax_code}
            editDropDown={dropDownData.tax_codeApi}
          />
        </div>
      )}
      {newProductUOM && (
        <div className="product-bg-btn">
          <NewproductUOM
            newProductUOM={newProductUOM}
            setnewProductUOM={setnewProductUOM}
            editNewproductUOM={editNewproductUOM}
            seteditNewproductUOM={seteditNewproductUOM}
            editDropDown={dropDownData.uomApi}
          />
        </div>
      )}
      {editNewproductUOM && (
        <div className="product-bg-btn">
          <NewproductUOM
            newProductUOM={newProductUOM}
            setnewProductUOM={setnewProductUOM}
            editNewproductUOM={editNewproductUOM}
            seteditNewproductUOM={seteditNewproductUOM}
            editDropDown={dropDownData.uomApi}
          />
        </div>
      )}
      {newproductWarehouse && (
        <div className="product-bg-btn">
          <NewproductWarehouse
            newproductWarehouse={newproductWarehouse}
            setnewproductWarehouse={setnewproductWarehouse}
            editnewproductWarehouse={editnewproductWarehouse}
            setEditnewproductWarehouse={setEditnewproductWarehouse}
            editDropDown={dropDownData.warehouseApi}
          />
        </div>
      )}
      {editnewproductWarehouse && (
        <div className="product-bg-btn">
          <NewproductWarehouse
            newproductWarehouse={newproductWarehouse}
            setnewproductWarehouse={setnewproductWarehouse}
            editnewproductWarehouse={editnewproductWarehouse}
            setEditnewproductWarehouse={setEditnewproductWarehouse}
            editDropDown={dropDownData.warehouseApi}
          />
        </div>
      )}
      {newproductSupplier && (
        <div className="product-bg-btn">
          <NewproductSupplier
            newproductSupplier={newproductSupplier}
            setnewproductSupplier={setnewproductSupplier}
            editnewproductSupplier={editnewproductSupplier}
            setEditnewproductSupplier={setEditnewproductSupplier}
            editDropDown={dropDownData.supplierApi}
          />
        </div>
      )}
      {editnewproductSupplier && (
        <div className="product-bg-btn">
          <NewproductSupplier
            newproductSupplier={newproductSupplier}
            setnewproductSupplier={setnewproductSupplier}
            editnewproductSupplier={editnewproductSupplier}
            setEditnewproductSupplier={setEditnewproductSupplier}
            editDropDown={dropDownData.supplierApi}
          />
        </div>
      )}
      {newproductSize && (
        <div className="product-bg-autoheight-btn">
          <NewproductSize
            newproductSize={newproductSize}
            setnewproductSize={setnewproductSize}
            editnewproductSize={editnewproductSize}
            setEditnewproductSize={setEditnewproductSize}
            editDropDown={dropDownData.sizeApi}
          />
        </div>
      )}
      {editnewproductSize && (
        <div className="product-bg-autoheight-btn">
          <NewproductSize
            newproductSize={newproductSize}
            setnewproductSize={setnewproductSize}
            editnewproductSize={editnewproductSize}
            setEditnewproductSize={setEditnewproductSize}
            editDropDown={dropDownData.sizeApi}
          />
        </div>
      )}
      {newproductColor && (
        <div className="product-bg-autoheight-btn">
          <NewproductColor
            newproductColor={newproductColor}
            setnewproductColor={setnewproductColor}
            editnewproductColor={editnewproductColor}
            setEditnewproductColor={setEditnewproductColor}
            editDropDown={dropDownData.colorApi}
          />
        </div>
      )}
      {editnewproductColor && (
        <div className="product-bg-autoheight-btn">
          <NewproductColor
            newproductColor={newproductColor}
            setnewproductColor={setnewproductColor}
            editnewproductColor={editnewproductColor}
            setEditnewproductColor={setEditnewproductColor}
            editDropDown={dropDownData.colorApi}
          />
        </div>
      )}

      <div
        className={`newProduct-container ${
          (newproduct_tax_code ||
            newproduct_edit_tax_code ||
            editNewproductUOM ||
            newProductUOM ||
            editnewproductWarehouse ||
            newproductWarehouse ||
            newproductSupplier ||
            editnewproductSupplier ||
            newproductSize ||
            editnewproductSize ||
            newproductColor ||
            editnewproductColor ||
            newproductCategory ||
            editnewproductCategory) &&
          "product-bg-blur"
        }`}
      >
        <form onSubmit={handleNewProductSubmit}>
          <div className="newProduct-title">
            <p>{editNewProduct ? "Edit" : "Create New"} Product</p>
            <div
              className="close-newproduct-container"
              onClick={() => {
                setshowNewProduct(false);
                setEditProduct({});
              }}
            >
              <svg
                className="circle-x-logo-newproduct"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
              <nav className="close-newproduct">Close</nav>
            </div>
          </div>
          <div className="createNewProduct-cointainer">
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              hidden
              onChange={handleImageChange}
            />
            {newProductImage ? (
              <div
                className="newProduct-photo-cointainer"
                onClick={() => {
                  inputRef.current && inputRef.current.click();
                }}
              >
                <div className="newProduct-photo-bg">
                  <nav className="newProduct-photo-bg-up">
                    <svg
                      className="newProject-camera-logo"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M220.6 121.2L271.1 96 448 96l0 96-114.8 0c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24L64 192l0-64 128 0c9.9 0 19.7-2.3 28.6-6.8zM0 128L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L271.1 32c-9.9 0-19.7 2.3-28.6 6.8L192 64l-32 0 0-16c0-8.8-7.2-16-16-16L80 32c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
                    </svg>
                    <p>Upload Photo</p>
                  </nav>
                  <nav className="newProduct-photo-bg-down">
                    <div>
                      <nav>
                        <p className="newProduct-photo-title">Allowed Format</p>
                        <p className="newProduct-photo-content">
                          JPG, JPEG, PNG
                        </p>
                      </nav>
                      <nav>
                        <p className="newProduct-photo-title">Max File Size</p>
                        <p className="newProduct-photo-content">2MB</p>
                      </nav>
                    </div>
                  </nav>
                </div>
              </div>
            ) : (
              <img
                className="newProduct-image"
                src={imageURL}
                alt="Product Preview"
                onClick={() => inputRef.current && inputRef.current.click()}
              />
            )}

            <div className="createNewProduct-right">
              <div className="createNewProduct-box">
                <label htmlFor="product_name">
                  Product Name<sup>*</sup>
                </label>
                <input
                  id="product_name"
                  type="text"
                  value={newProductData.product_name}
                  onChange={handleNewProjectDataChange}
                  placeholder="Headphones"
                  required
                />
              </div>
              <div className="createNewProduct-box">
                <label htmlFor="product_type">
                  Product Type<sup>*</sup>
                </label>
                <select
                  id="product_type"
                  value={newProductData.product_type}
                  onChange={handleNewProjectDataChange}
                  name="productType"
                  required
                >
                  <option value="">Select Product Type</option>
                  <option value="Goods">Goods</option>
                  <option value="Services">Services</option>
                  <option value="Combo">Combo</option>
                </select>
              </div>
              <div className="createNewProduct-box">
                <label htmlFor="product_id">
                  Product ID {"(Auto Generate)"}
                </label>
                <input
                  id="product_id"
                  type="text"
                  value={newProductData.product_id}
                  onChange={handleNewProjectDataChange}
                  placeholder="Auto Generate"
                  disabled
                />
              </div>

              <div className="createNewProduct-box">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  value={newProductData.description}
                  onChange={handleNewProjectDataChange}
                  type="text"
                  placeholder="Text Area"
                />
              </div>
            </div>
          </div>
          <div className="newProduct-title">
            <div>Create New Product</div>
          </div>
          <div className="NewProduct-input-cointainer">
            <div className="newProduct-box">
              <label htmlFor="category">
                <p>Category</p>
                <nav onClick={() => setnewproductCategory(true)}>+ Add New</nav>
              </label>
              <CategoryInput
                handleCustomChange={handleCustomChange}
                newProductData={newProductData}
                handleNewProjectCustomData={handleNewProjectCustomData}
                newProductcustom={newProductcustom}
                id={"category"}
                customApi={categoryApi}
              />
            </div>

            <div className="newProduct-box">
              <label htmlFor="sub_category">Sub Category</label>
              <input
                type="text"
                id="sub_category"
                value={newProductData.sub_category}
                onChange={handleNewProjectDataChange}
                placeholder="e.g., Laptop"
              />
            </div>
          </div>
          <div className="newProduct-title">
            <div>Pricing & Tax</div>
          </div>
          <div className="NewProduct-input-cointainer">
            <div className="newProduct-box">
              <label or="unit_price">Unit Price</label>
              <input
                className="increment-decrement-newProduct"
                type="number"
                id="price"
                placeholder="Enter Price"
                value={newProductData.price}
                onChange={handleNewProjectDataChange}
              />
            </div>
            <div className="newProduct-box">
              <label htmlFor="discount">Discount</label>
              <input
                className="increment-decrement-newProduct"
                type="number"
                id="discount"
                value={newProductData.discount}
                onChange={handleNewProjectDataChange}
                placeholder="e.g., 10%"
              />
            </div>
            <div className="newProduct-box">
              <label htmlFor="tax_code">
                <p>Tax Code</p>{" "}
                <nav onClick={() => setnewproduct_tax_code(true)}>
                  + Add New
                </nav>
              </label>
              <CategoryInput
                handleCustomChange={handleCustomChange}
                newProductData={newProductData}
                handleNewProjectCustomData={handleNewProjectCustomData}
                newProductcustom={newProductcustom}
                id={"tax_code"}
                customApi={tax_codeApi}
              />
            </div>
          </div>
          <div className="newProduct-title">
            <div>Unit & Stock</div>
          </div>
          <div className="NewProduct-input-cointainer">
            <div className="newProduct-box">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                className="increment-decrement-newProduct"
                value={newProductData.quantity}
                onChange={handleNewProjectDataChange}
                placeholder="e.g., 50"
              />
            </div>
            <div className="newProduct-box">
              <label htmlFor="uom">
                <p>UOM {"(Unit Of Measurement)"}</p>
                <nav onClick={() => setnewProductUOM(true)}>+ Add New</nav>
              </label>
              <CategoryInput
                handleCustomChange={handleCustomChange}
                newProductData={newProductData}
                handleNewProjectCustomData={handleNewProjectCustomData}
                newProductcustom={newProductcustom}
                id={"uom"}
                customApi={uomApi}
              />
            </div>
          </div>
          <div className="newProduct-title">
            <div>Inventory Details</div>
          </div>
          <div className="NewProduct-input-cointainer">
            <div className="newProduct-box">
              <label htmlFor="stock_level">Stock Level</label>
              <input
                className="increment-decrement-newProduct"
                type="number"
                id="stock_level"
                placeholder="e.g., 120"
                value={newProductData.stock_level}
                onChange={handleNewProjectDataChange}
              />
            </div>
            <div className="newProduct-box">
              <label htmlFor="reorder_level">Reorder Level</label>
              <input
                className="increment-decrement-newProduct"
                type="number"
                id="reorder_level"
                value={newProductData.reorder_level}
                onChange={handleNewProjectDataChange}
                placeholder="e.g., 30"
              />
            </div>
            <div className="newProduct-box">
              <label htmlFor="warehouse">
                <p>Warehouse</p>
                <nav onClick={() => setnewproductWarehouse(true)}>
                  + Add New
                </nav>
              </label>
              <CategoryInput
                handleCustomChange={handleCustomChange}
                newProductData={newProductData}
                handleNewProjectCustomData={handleNewProjectCustomData}
                newProductcustom={newProductcustom}
                id={"warehouse"}
                customApi={warehouseApi}
              />
            </div>
          </div>
          <div className="newProduct-title">
            <div>Product Attributes & Specifications</div>
          </div>
          <div className="NewProduct-input-cointainer">
            <div className="newProduct-box">
              <label htmlFor="size">
                <p>Size</p>
                <nav onClick={() => setnewproductSize(true)}>+ Add New</nav>
              </label>
              <CategoryInput
                handleCustomChange={handleCustomChange}
                newProductData={newProductData}
                handleNewProjectCustomData={handleNewProjectCustomData}
                newProductcustom={newProductcustom}
                id={"size"}
                customApi={sizeApi}
              />
            </div>
            <div className="newProduct-box">
              <label htmlFor="color">
                <p>Color</p>
                <nav onClick={() => setnewproductColor(true)}>+ Add New</nav>
              </label>
              <CategoryInput
                handleCustomChange={handleCustomChange}
                newProductData={newProductData}
                handleNewProjectCustomData={handleNewProjectCustomData}
                newProductcustom={newProductcustom}
                id={"color"}
                customApi={colorApi}
              />
            </div>
            <div className="newProduct-box">
              <label htmlFor="weight">Weight</label>
              <input
                // className="increment-decrement-newProduct"
                type="text"
                id="weight"
                value={newProductData.weight}
                onChange={handleNewProjectDataChange}
                placeholder="e.g., 300g"
              />
            </div>
          </div>
          <div className="NewProduct-input-cointainer">
            <div className="newProduct-box">
              <label htmlFor="specifications">Specifications</label>
              <input
                type="text"
                id="specifications"
                value={newProductData.specifications}
                onChange={handleNewProjectDataChange}
                placeholder="Text area"
              />
            </div>
          </div>
          <div className="newProduct-title">
            <div>Related Products & Supplier Info</div>
          </div>
          <div className="NewProduct-input-cointainer">
            <div className="newProduct-box">
              <label htmlFor="size">
                <p>Related Products</p>
              </label>
              <CustomCheckboxInput
                setnewProductData={setnewProductData}
                handleNewProjectCustomData={handleNewProjectCustomData}
                newProductcustom={newProductcustom}
                id={"related_products"}
                customApi={related_productsApi}
              />
            </div>
            <div className="newProduct-box">
              <label htmlFor="supplier">
                <p>Supplier</p>
                <nav onClick={() => setnewproductSupplier(true)}>+ Add New</nav>
              </label>
              <CategoryInput
                handleCustomChange={handleCustomChange}
                newProductData={newProductData}
                handleNewProjectCustomData={handleNewProjectCustomData}
                newProductcustom={newProductcustom}
                id={"supplier"}
                customApi={supplierApi}
              />
            </div>
          </div>
          <div className="newProduct-title">
            <div>Settings</div>
          </div>
          <div className="NewProduct-input-cointainer">
            <div className="newProduct-box">
              <label htmlFor="status">
                <p>
                  Status<sup>*</sup>
                </p>
              </label>
              <select
                id="status"
                value={newProductData.status}
                onChange={handleNewProjectDataChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
            <div className="newProduct-box">
              <label htmlFor="product_usage">
                <p>
                  Product Usage<sup>*</sup>
                </p>
              </label>
              <select
                id="product_usage"
                value={newProductData.product_usage}
                onChange={handleNewProjectDataChange}
                required
              >
                <option value="">Select Product Usage</option>
                <option value="Purchase">Purchase</option>
                <option value="Sale">Sale</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
          <div className="newProduct-submit-cointainer">
            <button
              className="newProduct-reset-btn"
              type="reset"
              onClick={handleNewProductReset}
            >
              Discard
            </button>
            <button
              className="newProduct-submit-btn"
              type="submit"
              onClick={() => {
                setEditProduct({});
              }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
