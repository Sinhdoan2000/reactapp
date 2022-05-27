import React from 'react';
import { useState, useCallback } from 'react';
import {Thumbnail, Autocomplete, Icon, TextField, Avatar, DisplayText} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import './Header.css';


//data history search
const deselectedOptions = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
  ];


function Header(){
    
    //variable hook search 
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);
    
    const updateText = useCallback(
        (value) => {
          setInputValue(value);
    
          if (value === '') {
            setOptions(deselectedOptions);
            return;
          }
    
          const filterRegex = new RegExp(value, 'i');
          const resultOptions = deselectedOptions.filter((option) =>
            option.label.match(filterRegex),
          );
          setOptions(resultOptions);
        },
        [deselectedOptions],
      );

      const updateSelection = useCallback(
        (selected) => {
          const selectedValue = selected.map((selectedItem) => {
            const matchedOption = options.find((option) => {
              return option.value.match(selectedItem);
            });
            return matchedOption && matchedOption.label;
          });
    
          setSelectedOptions(selected);
          setInputValue(selectedValue[0]);
        },
        [options],
      );

      const textField = (
        <Autocomplete.TextField
          onChange={updateText}
          value={inputValue}
          prefix={<Icon source={SearchMinor} color="base" />}
          placeholder="Search"
        />
      );

    return (
        <header>
            <div className="container">
                <div className='row header-row'>
                    <div className="col">
                        <Thumbnail
                            source="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMTQzIj4KICA8cGF0aAogICAgZmlsbD0iIzk1QkY0NyIKICAgIGQ9Ik0xMDcuNCAyNy4xYy0uMS0uNy0uNy0xLjEtMS4yLTEuMWwtMTAuNC0uMi05LjEtOC45Yy0uOC0uOC0yLjQtLjYtMy0uNGwtNC4yIDEuM2MtLjQtMS40LTEuMS0zLjEtMi00LjktMi45LTUuNi03LjMtOC42LTEyLjUtOC42bC0xLjEuMS0uNS0uNUExMS4xIDExLjEgMCAwMDU0LjcuNEM0OCAuNiA0MS4zIDUuNSAzNS44IDE0LjFhNTYuNCA1Ni40IDAgMDAtNy42IDE5LjZsLTEzLjMgNC4xYy0zLjkgMS4yLTQgMS4zLTQuNSA1QzEwLjIgNDUuNiAwIDEyNC41IDAgMTI0LjVsODUuNiAxNC44IDM3LjEtOS4yLTE1LjMtMTAzem0tMzIuMi03LjlsLTYuNiAyLjFhMzcgMzcgMCAwMC0yLTEyLjJjNS4xLjggNy42IDYuNiA4LjYgMTAuMXptLTExLjEgMy40TDQ5LjggMjdjMS40LTUuMyA0LTEwLjUgNy4yLTE0IDEuMi0xLjMgMi45LTIuNyA0LjgtMy41IDIgMy45IDIuNCA5LjQgMi4zIDEzLjF6TTU0LjkgNC45YzEuNiAwIDIuOS4zIDQgMS4xLTEuOC45LTMuNiAyLjMtNS4yIDQuMWEzOSAzOSAwIDAwLTguOSAxOC42bC0xMS43IDMuNkMzNS41IDIxLjQgNDQuNiA1LjIgNTQuOSA0Ljl6IgogIC8+CiAgPHBhdGgKICAgIGZpbGw9IiM1RThFM0UiCiAgICBkPSJNMTA2LjIgMjZsLTEwLjQtLjItOS4xLTguOWMtLjMtLjMtLjctLjUtMS4xLS41djEyMi45bDM3LjEtOS4yLTE1LjItMTAzYy0uMi0uNy0uOC0xLjEtMS4zLTEuMXoiCiAgLz4KICA8cGF0aAogICAgZmlsbD0iI0ZGRiIKICAgIGQ9Ik02NSA0NS4xbC00LjMgMTYuMXMtNC44LTIuMi0xMC41LTEuOGMtOC40LjUtOC40IDUuOC04LjQgNy4xLjUgNy4yIDE5LjQgOC44IDIwLjUgMjUuNy44IDEzLjMtNyAyMi40LTE4LjQgMjMuMWEyOCAyOCAwIDAxLTIxLjEtNy4zbDIuOS0xMi4zczcuNiA1LjcgMTMuNiA1LjNhNS4zIDUuMyAwIDAwNS4yLTUuN2MtLjYtOS40LTE2LTguOC0xNy0yNC4zLS44LTEzIDcuNy0yNi4xIDI2LjUtMjcuMyA3LjMtLjUgMTEgMS40IDExIDEuNHoiCiAgLz4KICA8cGF0aAogICAgZmlsbD0iIzAwMCIKICAgIGQ9Ik0xNzIuOSA3OS40Yy00LjMtMi4zLTYuNS00LjMtNi41LTcgMC0zLjQgMy4xLTUuNiA3LjktNS42IDUuNiAwIDEwLjYgMi4zIDEwLjYgMi4zbDMuOS0xMnMtMy42LTIuOC0xNC4yLTIuOGMtMTQuOCAwLTI1LjEgOC41LTI1LjEgMjAuNCAwIDYuOCA0LjggMTEuOSAxMS4yIDE1LjYgNS4yIDIuOSA3IDUgNyA4LjEgMCAzLjItMi42IDUuOC03LjQgNS44LTcuMSAwLTEzLjktMy43LTEzLjktMy43bC00LjIgMTJzNi4yIDQuMiAxNi43IDQuMmMxNS4yIDAgMjYuMi03LjUgMjYuMi0yMS0uMS03LjMtNS42LTEyLjUtMTIuMi0xNi4zek0yMzMuNSA1NC4xYy03LjUgMC0xMy40IDMuNi0xNy45IDlsLS4yLS4xIDYuNS0zNEgyMDVsLTE2LjUgODYuNmgxNi45TDIxMSA4NmMyLjItMTEuMiA4LTE4LjEgMTMuNC0xOC4xIDMuOCAwIDUuMyAyLjYgNS4zIDYuM2EzOCAzOCAwIDAxLS43IDcuNWwtNi40IDMzLjloMTYuOWw2LjYtMzVjLjctMy43IDEuMi04LjEgMS4yLTExLjEuMS05LjYtNC45LTE1LjQtMTMuOC0xNS40ek0yODUuNyA1NC4xYy0yMC40IDAtMzMuOSAxOC40LTMzLjkgMzguOSAwIDEzLjEgOC4xIDIzLjcgMjMuMyAyMy43IDIwIDAgMzMuNS0xNy45IDMzLjUtMzguOS4xLTEyLjEtNy0yMy43LTIyLjktMjMuN3ptLTguMyA0OS43Yy01LjggMC04LjItNC45LTguMi0xMS4xIDAtOS43IDUtMjUuNSAxNC4yLTI1LjUgNiAwIDggNS4yIDggMTAuMiAwIDEwLjQtNS4xIDI2LjQtMTQgMjYuNHpNMzUyIDU0LjFjLTExLjQgMC0xNy45IDEwLjEtMTcuOSAxMC4xaC0uMmwxLTkuMWgtMTVhMzc2IDM3NiAwIDAxLTMuNCAyMi41bC0xMS44IDYyaDE2LjlsNC43LTI1LjFoLjRzMy41IDIuMiA5LjkgMi4yYzE5LjkgMCAzMi45LTIwLjQgMzIuOS00MSAwLTExLjQtNS4xLTIxLjYtMTcuNS0yMS42ek0zMzUuOCAxMDRjLTQuNCAwLTctMi41LTctMi41bDIuOC0xNS44YzItMTAuNiA3LjUtMTcuNiAxMy40LTE3LjYgNS4yIDAgNi44IDQuOCA2LjggOS4zIDAgMTEtNi41IDI2LjYtMTYgMjYuNnpNMzkzLjcgMjkuOGE5LjcgOS43IDAgMDAtOS43IDkuOGMwIDUgMy4yIDguNSA4IDguNWguMmM1LjMgMCA5LjgtMy42IDkuOS05LjggMC00LjktMy4zLTguNS04LjQtOC41ek0zNzAgMTE1LjVoMTYuOWwxMS41LTYwaC0xN3pNNDQxLjUgNTUuNGgtMTEuOGwuNi0yLjhjMS01LjggNC40LTEwLjkgMTAuMS0xMC45IDMgMCA1LjQuOSA1LjQuOWwzLjMtMTMuM3MtMi45LTEuNS05LjItMS41Yy02IDAtMTIgMS43LTE2LjYgNS42LTUuOCA0LjktOC41IDEyLTkuOCAxOS4ybC0uNSAyLjhoLTcuOWwtMi41IDEyLjhoNy45bC05IDQ3LjRoMTYuOWw5LTQ3LjRoMTEuN2wyLjQtMTIuOHpNNDgyLjMgNTUuNVM0NzEuNyA4Mi4yIDQ2NyA5Ni44aC0uMmMtLjMtNC43LTQuMi00MS4zLTQuMi00MS4zaC0xNy44bDEwLjIgNTUuMWMuMiAxLjIuMSAyLS40IDIuOC0yIDMuOC01LjMgNy41LTkuMiAxMC4yYTM5IDM5IDAgMDEtOS42IDQuOGw0LjcgMTQuNGEzOSAzOSAwIDAwMTYuNi05LjJjNy43LTcuMiAxNC45LTE4LjQgMjIuMi0zMy42TDUwMCA1NS41aC0xNy43eiIKICAvPgo8L3N2Zz4K"
                            size="large"
                            alt="Black choker necklace"
                        />
                    </div>
                    <div className="col header-search">
                        <Autocomplete
                            options={options}
                            selected={selectedOptions}
                            onSelect={updateSelection}
                            textField={textField}
                        />
                    </div>
                    <div className="col header-avatar">
                        <div className="row">
                            <Avatar customer name="Đoàn Xuân Sinh" />
                            <h4>Đoàn Xuân Sinh</h4>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;