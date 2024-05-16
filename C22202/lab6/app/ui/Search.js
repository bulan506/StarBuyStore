'use client';
import { useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, InputGroup, Row } from 'react-bootstrap';

const Item = ({ item }) => {
    const { id, name } = item;

    return (
        <Dropdown.Item eventKey={id}>
            {name}
        </Dropdown.Item>
    );
};

export default function Search() {
    
    var shopStorage = JSON.parse(localStorage.getItem('Shop'));
    if (!shopStorage) {
        shopStorage = { products: [], categories: [], slctCategory: 0 }
        localStorage.setItem('Shop', JSON.stringify(shopStorage));
    }
    const [shop, setShop] = useState(shopStorage);
    const categories = [{ id: 0, name: 'All' }, ...shop.categories];
    const selectedItem = categories.find(item => item.id === shop.slctCategory)
    const [dropdownItem, setDropdownItem] = useState(selectedItem.name)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://localhost:7194/api/Store'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            if (shop.slctCategory === 0) {
                let dataCopy = { ...data, slctCategory: 0 }
                localStorage.setItem('Shop', JSON.stringify(dataCopy));
                setShop(dataCopy);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };


    const handleChangeSelect = async (id) => {
        const selectedItem = categories.find(item => item.id === Number(id))
        if (selectedItem) {
            setDropdownItem(selectedItem.name)
            try {
                const response = await fetch('https://localhost:7194/api/Store/Products?category=' + id); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                let shopCopy = { ...shop }
                shopCopy.products = data
                shopCopy.slctCategory = Number(id)
                setShop(shopCopy);
                localStorage.setItem('Shop', JSON.stringify(shopCopy));
                window.location.href = "./";
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
    }
    return (
        <>
            <InputGroup >
                <DropdownButton
                    variant="outline-secondary"
                    title={dropdownItem}
                    id="input-group-dropdown-1"
                    onSelect={handleChangeSelect}
                >
                    {categories.map(item =>
                        <Item key={item.id} item={item} />
                    )}
                </DropdownButton>
                <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>

        </>
    );
}