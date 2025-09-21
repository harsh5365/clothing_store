'use client';

import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ImageInput,
  SelectInput,
  ReferenceInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  minValue,
  SaveButton,
  Toolbar,
  useGetList
} from 'react-admin';

const ProductCreateToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const ProductCreate = () => {
  const { data: categoriesData } = useGetList('categories');

  return (
    <Create title="Create Product">
      <SimpleForm toolbar={<ProductCreateToolbar />}>
        <TextInput source="name" validate={[required()]} fullWidth />
        <TextInput source="slug" validate={[required()]} fullWidth />
        <TextInput source="description" multiline rows={4} fullWidth />
        
        <div className="row">
          <div className="col-md-4">
            <NumberInput 
              source="price" 
              validate={[required(), minValue(0)]}
              options={{ style: 'currency', currency: 'USD' }}
            />
          </div>
          <div className="col-md-4">
            <NumberInput 
              source="comparePrice" 
              validate={[minValue(0)]}
              options={{ style: 'currency', currency: 'USD' }}
            />
          </div>
          <div className="col-md-4">
            <NumberInput 
              source="costPrice" 
              validate={[minValue(0)]}
              options={{ style: 'currency', currency: 'USD' }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <TextInput source="sku" validate={[required()]} />
          </div>
          <div className="col-md-6">
            <TextInput source="barcode" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <ReferenceInput source="categoryId" reference="categories" validate={[required()]}>
              <SelectInput 
                optionText="name"
                optionValue="id"
                choices={categoriesData}
              />
            </ReferenceInput>
          </div>
          <div className="col-md-6">
            <TextInput source="tags" placeholder="casual, cotton, basic" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <BooleanInput source="isActive" defaultValue={true} />
          </div>
          <div className="col-md-3">
            <BooleanInput source="isFeatured" defaultValue={false} />
          </div>
          <div className="col-md-3">
            <NumberInput source="weight" step={0.1} defaultValue={0.5} />
          </div>
          <div className="col-md-3">
            <TextInput source="dimensions.length" label="Length (cm)" defaultValue={70} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <TextInput source="dimensions.width" label="Width (cm)" defaultValue={50} />
          </div>
          <div className="col-md-6">
            <TextInput source="dimensions.height" label="Height (cm)" defaultValue={1} />
          </div>
        </div>

        <ImageInput source="images" label="Product Images" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>

        <ArrayInput source="variants" label="Product Variants">
          <SimpleFormIterator>
            <TextInput source="size" validate={[required()]} />
            <TextInput source="color" validate={[required()]} />
            <NumberInput source="stock" validate={[required(), minValue(0)]} />
            <TextInput source="sku" />
          </SimpleFormIterator>
        </ArrayInput>

        <div className="row">
          <div className="col-md-6">
            <TextInput source="seoTitle" label="SEO Title" fullWidth />
          </div>
          <div className="col-md-6">
            <TextInput source="seoDescription" label="SEO Description" fullWidth />
          </div>
        </div>
      </SimpleForm>
    </Create>
  );
};

export default ProductCreate;
