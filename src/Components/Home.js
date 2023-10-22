import React, { useState, useEffect } from "react";
import template from "../Images/Frame.png";
import Flag from "../Images/australia.png";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [CapitalGain, setCapitalGain] = useState("");
  const [discountGain, setDiscountGain] = useState("");
  const [selectedInvestmentType, setSelectedInvestmentType] = useState(null);
  const [netGain, setNetGain] = useState("");
  const [taxPaid, setTaxPaid] = useState("");

  const handleInputChange = () => {
    const purchase = parseFloat(purchasePrice) || 0;
    const sale = parseFloat(salePrice) || 0;
    const expense = parseFloat(expenses) || 0;
    const calculatedGain = sale - purchase - expense;
    setCapitalGain(calculatedGain);
  };

  useEffect(() => {
    const calculatedNetGain = CapitalGain - discountGain;
    setNetGain(calculatedNetGain);
  }, [CapitalGain, discountGain]);

  const taxRates = {
    option1: "0%",
    option2: "Nil + 19% of excess over $18,200",
    option3: "$5,092 + 32.5% of excess over $45,000",
    option4: "$29,467 + 37% of excess over $120,000",
    option5: "$51,667 + 45% of excess over $180,000",
  };

  const tax_Paid = {
    option1: 0 * netGain,
    option2: 0.19 * netGain,
    option3: 0.325 * netGain,
    option4: 0.37 * netGain,
    option5: 0.45 * netGain,
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };

  const handleInvestmentTypeChange = (type) => {
    setSelectedInvestmentType(type);
    calculateDiscount(type);
  };

  const calculateDiscount = (type) => {
    if (type === "longTerm" && CapitalGain >= 0) {
      setDiscountGain(CapitalGain * 0.5);
      const NetGain = CapitalGain - discountGain;
      setNetGain(NetGain);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-md-8 calculator-section">
            <div className="main-heading">
              <h1>Free Crypto Tax Calculator Australia</h1>
            </div>
            <div style={{ padding: "10px 65px" }} className="shorterScreen">
              <div className="select-container p-0 col-md-12 d-flex justify-content-between align-content-center  ">
                <div className="select-left col-6 my-2 col-md-6 col-lg-6  d-flex justify-content-around align-content-center">
                  <p
                    className="m-0 pl-0 d-flex justify-content-around align-items-center"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Finacial Year
                  </p>
                  <select
                    id="dropdown"
                    class="form-select my-2  px-2"
                    aria-label="Default select example"
                  >
                    <option selected>FY 2023-24</option>
                  </select>
                </div>
                <div className="select-right d-flex col-6 my-2 col-md-6 col-lg-6  justify-content-evenly align-content-center">
                  <p className="m-0 px-3 d-flex justify-content-around align-items-center">
                    Country
                  </p>
                  <select
                    id="dropdown"
                    class="form-select w-100 px-2 my-2 select-class"
                    aria-label="Default select example"
                  >
                    <option selected>Australia</option>
                  </select>
                  <img
                    src={Flag}
                    className="img-fluid img-class"
                    width="20px"
                    height="20px"
                    alt=""
                  />
                </div>
              </div>

              <div className="calculation-part">
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">Enter purchase price of Crypto</label>
                    <input
                      type=""
                      name="purchasePrice"
                      id="purchasePrice"
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      onKeyUp={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Enter sale price of Crypto</label>
                    <input
                      type=""
                      name="salePrice"
                      id="salePrice"
                      onChange={(e) => setSalePrice(e.target.value)}
                      onKeyUp={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Enter your Expenses</label>
                    <input
                      type=""
                      name="expenses"
                      id="expenses"
                      onChange={(e) => setExpenses(e.target.value)}
                      onKeyUp={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="investmentType">Investment type</label>
                    <br />
                    <div className="shortTerm">
                      <button
                        type="button"
                        name="shortTerm"
                        value="shortTerm"
                        className={
                          selectedInvestmentType === "shortTerm"
                            ? "selected"
                            : "button"
                        }
                        onClick={() => handleInvestmentTypeChange("shortTerm")}
                      >
                        {" "}
                        {selectedInvestmentType === "shortTerm" && (
                          <span className="tick-mark" style={{float:"right"}}>&#10003;</span>
                        )}
                      </button>
                      <span>{"< 12 months"}</span>
                    </div>
                    <div className="longTerm">
                      <button
                        type="button"
                        name="longTerm"
                        id="longTerm"
                        value="longTerm"
                        className={
                          selectedInvestmentType === "longTerm"
                            ? "button selected"
                            : "button"
                        }
                        onClick={() => handleInvestmentTypeChange("longTerm")}
                      >
                         {selectedInvestmentType === "longTerm" && (
                          <span className="tick-mark" style={{float:"right"}}>&#10003;</span>
                        )}
                      </button>
                      <span>{"> 12 months"}</span>
                    </div>
                  </div>

                  <div className="row" style={{ margin: "20px 0px" }}>
                    <div className="col-md-6">
                      <label htmlFor="" name="annualIncome">
                        Select Your Annual Income
                      </label>
                      <select
                        style={{ width: "100%", marginTop: "10px" }}
                        id="dropdown"
                        onChange={handleDropdownChange}
                        value={selectedOption}
                      >
                        <option value="option1">$0 - $18,200</option>
                        <option value="option2">$18,201 - $45,000</option>
                        <option value="option3">$45,001 - $120,000</option>
                        <option value="option4">$120,001 - $180,000</option>
                        <option value="option5">$180,001+</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="">Tax Rate</label>
                      {/* <h1 type="text" name="taxRate" id="taxRate"  value={taxRates[selectedOption]} readOnly>h1 */}
                      <p
                        name="taxRate"
                        id="taxRate"
                        style={{ marginTop: "10px" }}
                      >
                        {taxRates[selectedOption]}
                      </p>
                    </div>
                  </div>

                  {selectedInvestmentType === "longTerm" && (
                    <>
                      <div className="col-md-6">
                        <label htmlFor="">Capital gains amount</label>
                        <input
                          type="text"
                          name="capitalGains"
                          id="capitalGains"
                          value={CapitalGain}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Discount for long term gains</label>
                        <input
                          type="text"
                          name="discountGain"
                          id="discountGain"
                          value={discountGain}
                        />
                      </div>
                    </>
                  )}

                  <div
                    className="shorterTabs"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div className="">
                      <div className="net-capital-gain">
                        <p>Net Capital gains tax amount</p>
                        <h4 name="netGain">${netGain}</h4>
                      </div>
                    </div>
                    <div className="">
                      <div className="tax-paid">
                        <p>The tax you need to pay*</p>
                        <h4 name="tax_Paid">${tax_Paid[selectedOption]}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="template">
              <div className="template-heading">
                <h3>Get Started with KoinX for Free</h3>
              </div>
              <div className="description">
                <p>
                  With our range of features that you can equip for free, KoniX
                  allows you to be more educated and aware of your tax reports.
                </p>
              </div>
              <div className="image-part">
                <img src={template} alt="" />
              </div>

              <button className="template-button">
                Get Started for free <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
