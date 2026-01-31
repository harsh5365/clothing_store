'use client';

import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  FunctionField,
  TopToolbar,
  FilterButton,
  SearchInput,
} from 'react-admin';

const OrderFilters = [
  <SearchInput key="search" source="orderNumber" alwaysOn />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
  </TopToolbar>
);

const OrderList = () => (
  <List
    filters={OrderFilters}
    actions={<ListActions />}
    title="Orders"
    perPage={25}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="orderNumber" label="Order #" />
      <FunctionField
        label="Customer"
        render={(record) => record.user?.name || record.user?.email || record.userId}
      />
      <NumberField
        source="total"
        label="Total"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextField source="status" label="Status" />
      <TextField source="shippingName" label="Ship to" />
      <DateField source="createdAt" label="Date" showTime />
    </Datagrid>
  </List>
);

export default OrderList;
