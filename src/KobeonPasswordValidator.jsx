import { Component, createElement } from "react";

import { PasswordCheck } from "./components/ValidPassword";

import "./ui/KobeonPasswordValidator.css";

export default class PasswordValidator extends Component {
    render() {
        return (
            <PasswordCheck
                hasUppercase={this.props.hasUppercase}
                hasLowercase={this.props.hasLowercase}
                hasDigits={this.props.hasDigits}
                hasSymbols={this.props.hasSymbols}
                enableMinLength={this.props.enableMinLength}
                minLength={this.props.minLength}
                enableMaxLength={this.props.enableMaxLength}
                maxLength={this.props.maxLength}
                password={this.props.password}
                iconValid={this.props.iconValid}
                iconInvalid={this.props.iconInvalid}
                isValid={this.props.isValid}
                language={this.props.language}
            />
        );
    }
}
