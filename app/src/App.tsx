import React from 'react';
import { Button } from 'antd';


import { useGetBanksQuery } from './api/bank.slice';
import BankTable from './components/table';
import BankCreate from './components/create';

function App() {

  const { data: bankData, isFetching: bankLoading, error: bankError } = useGetBanksQuery();

  const [createModalVisible, setCreateModalVisible] = React.useState(false);


  return (
    <React.Fragment>
      <div>
        <h1>Bank Accounts</h1>
        <Button type="primary" onClick={() => setCreateModalVisible(true)}>Create Bank</Button>
        <BankCreate visible={createModalVisible} onCancel={() => setCreateModalVisible(false)} />
      </div>
      <BankTable dataSource={bankData} isFetching={bankLoading} error={bankError} />
    </React.Fragment>)
}

export default App;
