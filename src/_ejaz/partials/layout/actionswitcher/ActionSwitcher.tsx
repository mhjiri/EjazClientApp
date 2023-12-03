import React from 'react';
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
  
function ActionSwitcher() {
    return (
        <div>
            <Dropdown noCaret title="...">
                <Dropdown.Item>View</Dropdown.Item>
                <Dropdown.Item>Edit</Dropdown.Item>
            </Dropdown>
        </div>
    )
}
  
export default ActionSwitcher;