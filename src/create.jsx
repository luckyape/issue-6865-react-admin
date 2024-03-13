import React, { useState, useCallback } from "react";
import { Create, SimpleForm } from "react-admin";

import { ImagesField } from "./components/imagesField";

const CreateTest = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ImagesField />
      </SimpleForm>
    </Create>
  );
};

export default CreateTest;
