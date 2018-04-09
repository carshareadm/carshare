import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styles from './SelectLocation.css';

const showDropdown = ({currentLocation, locations, setLocation}) => (
  <UncontrolledDropdown>
    <DropdownToggle caret className={styles.dropdown}>
      {currentLocation ? currentLocation.name : "Select Location"}
    </DropdownToggle>
    <DropdownMenu>
      {locations.map(l => (
        <DropdownItem key={l._id} data-id={l._id} onClick={setLocation}>
          {l.name}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </UncontrolledDropdown>
);

export default showDropdown;