import { Component, createElement } from "react";
import PasswordValidator from "password-validator";
import { Icon } from "mendix/components/web/Icon";

export class PasswordCheck extends Component {
    render() {
        const {
            hasUppercase,
            hasLowercase,
            hasDigits,
            hasSymbols,
            enableMinLength,
            minLength,
            enableMaxLength,
            maxLength,
            language,
            password: passwordAttr,
            iconValid: iconValidWrapper,
            iconInvalid: iconInvalidWrapper
        } = this.props;

        const password = passwordAttr?.value;
        const iconValid = iconValidWrapper?.value;
        const iconInvalid = iconInvalidWrapper?.value;

        const schema = new PasswordValidator();
        const rules = [];

        if (hasUppercase) {
            schema.has().uppercase();
            rules.push("uppercase");
        }
        if (hasLowercase) {
            schema.has().lowercase();
            rules.push("lowercase");
        }
        if (hasDigits) {
            schema.has().digits();
            rules.push("digits");
        }
        if (hasSymbols) {
            schema.has().symbols();
            rules.push("symbols");
        }
        if (enableMinLength && typeof minLength === "number") {
            schema.is().min(minLength);
            rules.push("min");
        }
        if (enableMaxLength && typeof maxLength === "number") {
            schema.is().max(maxLength);
            rules.push("max");
        }

        const trimmedPassword = (password || "").trim();
        const failedRules = schema.validate(trimmedPassword, { list: true });
        const allValid = failedRules.length === 0;

        if (this.props.isValid && typeof this.props.isValid.setValue === "function") {
            this.props.isValid.setValue(allValid);
        }

        const ruleDescriptionsDutch = {
            min: `Zorg dat het wachtwoord minstens ${minLength} tekens lang is`,
            max: `Zorg dat het wachtwoord niet langer is dan ${maxLength} tekens`,
            uppercase: "Zorg dat het wachtwoord minstens één hoofdletter bevat",
            lowercase: "Zorg dat het wachtwoord minstens één kleine letter bevat",
            digits: "Zorg dat het wachtwoord minstens één cijfer bevat",
            symbols: "Zorg dat het wachtwoord minstens één speciaal teken bevat"
        };

        const ruleDescriptionsEnglish = {
            min: `Make sure the password is at least ${minLength} characters long`,
            max: `Make sure the password is not longer than ${maxLength} characters`,
            uppercase: "Make sure the password contains at least one uppercase letter",
            lowercase: "Make sure the password contains at least one lowercase letter",
            digits: "Make sure the password contains at least one digit",
            symbols: "Make sure the password contains at least one special character"
        };

        const ruleDescriptions = language === "nl" ? ruleDescriptionsDutch : ruleDescriptionsEnglish;

        return (
            <div className="password-validator-widget">
                {rules.map(rule => {
                    const passed = !failedRules.includes(rule);
                    const className = passed ? "requirement-valid" : "requirement-invalid";
                    const icon = passed ? iconValid : iconInvalid;
                    const showCustomIcon = icon?.type && (icon.iconClass || icon.url);

                    return (
                        <div
                            key={rule}
                            className={className}
                            style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
                        >
                            {showCustomIcon && <Icon icon={icon} />}
                            <span>{ruleDescriptions[rule]}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}
