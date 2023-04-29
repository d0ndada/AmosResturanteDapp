import React from "react";
import "./Stepper.css";

const Stepper = ({ currentStep }) => {
  return (
    <div className="stepper">
      <div className={`step${currentStep === 1 ? " active" : ""}`}>
        <span className="step-number">1</span>
        {currentStep === 1 && <span className="step-label">Date & Time</span>}
      </div>
      <div className="step-separator"></div>
      <div className={`step${currentStep === 2 ? " active" : ""}`}>
        <span className="step-number">2</span>
        {currentStep === 2 && (
          <span className="step-label">Contact Information</span>
        )}
      </div>
      <div className="step-separator"></div>

      <div className={`step${currentStep === 3 ? " active" : ""}`}>
        <span className="step-number">3</span>
        {currentStep === 3 && <span className="step-label">Summary</span>}
      </div>
    </div>
  );
};

export default Stepper;
