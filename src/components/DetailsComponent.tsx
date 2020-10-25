import React from 'react';

const DetailsComponent: React.FC<{ item: TableItem; }> = ({
  item,
}) => {
  return (
    <ul className="property_list">
      {'properties' in item.component ? item.component?.properties.map((p) => (
        <>
          <li className="property_list_item">
            <strong>{p.name}</strong><br />
            {Array.isArray(p.value) ? p.value.join(', ').toString() : p.value}
          </li>
        </>
      )) : null}
    </ul>
  );
};

export default DetailsComponent;
