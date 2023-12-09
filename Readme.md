# Power Apps Component Framework (PCF) Checkbox Control

## Description

This project includes Checkbox components for PowerApps Model Driven app/Dynamics 365 CE built using Microsoft Fluent UI v9
It is built as standard PCF component and platform libraries are not used for these controls. After Virtual Reach Components are GA the control will be updated to use platform libraries

This Control is made to work with two types of Dataverse Columns, MultiSelectOptionSets and OptionSets. There are two separate controls packages in a single solution

PowerApps Component Framework: [Learn About Code Components](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview)

Microsoft Fluent UI: [Fluent UI React Components](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)

Microsoft Fluent UI Checkbox Component: [Fluent UI Checkbox Components](https://react.fluentui.dev/?path=/docs/components-checkbox--default)

React: [React](https://react.dev/)

React-DOM: [React-DOM](https://legacy.reactjs.org/docs/react-dom.html)

### Project Structure

> MultiSelectPcf is the Checkbox PCF control for MultiSelectOptionSet Columns

> OptionSetPcf is the Checkbox PCF control for SingleSelectOptionSet Columns

> FluentUIChoicePcfCdsProj is a CDS Solution Project Containing References to MultiSelectPcf and OptionSetPcf

> Release_Solutions folder contains a managed solution with the latest release for the Checkbox controls. This can be downloaded and used in a PowerPlatform/Dynamics 365 Environment.

To Build the PowerApps/Dynamics 365 solution in Visual Studio, Open `FluentUIChoicePcfCdsProj` run `msbuild /t:build /restore` to restore the packages and to build a managed solution run `msbuild /property:Configuration=Release`

MultiSelectPcf and OptionSetPcf are independent PCF projects, use `npm install` after navigating to either folder to install the dependencies for the PCF project
