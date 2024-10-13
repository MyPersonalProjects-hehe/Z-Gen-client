import { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

interface MenuComponentProp {
  setSelectedFilterValue: (value: string) => void;
}

function MenuComponent({ setSelectedFilterValue }: MenuComponentProp) {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <MailOutlined />,
      label: 'Models',
      children: [
        { key: '11', label: 'Samsung' },
        { key: '12', label: 'Motorola' },
        { key: '13', label: 'Iphone' },
        { key: '14', label: 'Huawei' },
        { key: '15', label: 'Clear filters' },
      ],
    },
    {
      key: '2',
      icon: <AppstoreOutlined />,
      label: 'Sort by',
      children: [
        { key: '21', label: 'Price' },
        { key: '22', label: 'RAM memory' },
      ],
    },
  ];

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  // capturing the filter value
  function captureClickValue(itemClickValue: any) {
    const selectedModel = items
      .map((item: any) =>
        item.children.filter((model: any) => model.key === itemClickValue.key)
      )
      .filter((result: any) => result.length > 0)
      .flat()[0].label;
    setSelectedFilterValue(selectedModel);
  }

  return (
    <Menu
      mode='inline'
      onOpenChange={onOpenChange}
      style={{ width: 280, fontSize: 23 }}
      items={items}
      onSelect={(item) => captureClickValue(item)}
    />
  );
}

export default MenuComponent;
