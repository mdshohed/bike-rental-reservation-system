import React from 'react';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const SearchField: React.FC = () => {
  
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return(
    <Space direction="vertical">
      <Search  placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 220 }} />
    </Space>
  )
};

export default SearchField;