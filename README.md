# Dynamic Form Renderer (React + Material UI)

This project is a **dynamic, configurable form renderer** built with **React** and **Material UI**.
It allows forms to be generated from a configuration file, dynamically mapped to mock incident data, and updated on submission.

The form supports multiple field types, default value mapping, conditional rendering, validation, and flexible field ordering.

---

## 🚀 Features

* **Dynamic Rendering**
  Fields are rendered based on a provided configuration, making it easy to:

  * Add or remove fields
  * Reorder fields
  * Rename fields
  * Change where fields read/write values in the data

* **Default Value Support**
  Fields can populate their values using lookup paths defined in the configuration.

* **Supported Field Types**

  1. **Text Input** – standard free-text field
  2. **Integer Input** – number input with min/max validation
  3. **Enum Input** – dropdown selection from predefined options
  4. **Currency Input** – structured field with currency selector + amount input on the same line

* **Validation**

  * Fields can be marked as **required** and will prevent submission until filled
  * Required fields are visually indicated

* **Conditional Rendering**

  * Fields can be displayed conditionally based on:

    * Other values in the form
    * Input data provided before submission

* **Live Data Updates**

  * On submission, the updated incident data is displayed on screen, reflecting form changes.

---

## 🛠 Tech Stack

* **React 18**
* * **TypeScript**
* **Material UI (MUI)** – components & styling
* **JavaScript (ES6+)**

---

## 📂 Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/israr58/dynamic-form-renderer.git
   cd dynamic-form-renderer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the project locally:

   ```bash
   npm run dev
   ```

4. Open in your browser:

   ```
   http://localhost:3000
   ```

---

## 📖 Usage

1. Update the **form configuration** (`formConfig.js`) to define fields, types, order, default value paths, and validation.
2. Provide **mock incident data** (`incidentData.js`) to pre-populate form values.
3. Submit the form to see the updated data rendered on screen.

---

## 🔧 Example Config

```js
const formConfig = [
  {
    field: "title",
    label: "Incident Title",
    type: "textInput",
    path: "incident.title",
    required: true
  },
  {
    field: "priority",
    label: "Priority",
    type: "enumInput",
    options: ["Low", "Medium", "High"],
    path: "incident.priority"
  },
  {
    field: "amount",
    label: "Estimated Cost",
    type: "currencyInput",
    path: "incident.cost"
  }
];
```

---

## ✅ Roadmap

* [x] Dynamic text input fields
* [x] Default value mapping from incident data
* [x] Integer input with min/max
* [x] Enum dropdown input
* [x] Currency input (currency + amount together)
* [x] Required field validation
* [x] Conditional rendering support

---

## 📌 Notes

* Designed for extensibility — new field types can be added easily
* Styling and layout improvements leverage Material UI components
* Built for adaptability to changing form requirements

---
