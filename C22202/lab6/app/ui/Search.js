'use client';
import { useCallback, useEffect, useState } from 'react';
import { Button,DropdownButton, Form, InputGroup, Row } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation'

const Item = ({ item, handleCheckboxChange, checked }) => {
    const { id, name } = item;

    return (
        <Form.Check
            name={name}
            type="checkbox"
            label={name}
            checked={checked}
            onChange={() => handleCheckboxChange(id)}
        />
    );
};

export default function Search() {

    var shopStorage = JSON.parse(localStorage.getItem('Shop'));
    if (!shopStorage) {
        shopStorage = { products: [], categories: []}
        localStorage.setItem('Shop', JSON.stringify(shopStorage));
    }
    const [shop, setShop] = useState(shopStorage);
    const searchParams = useSearchParams()
    const categories = [{ id: 0, name: 'Select all' }, ...shop.categories];
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchText, setSearchText] = useState('');
    const router = useRouter()


    const createQueryString = useCallback(
        (value) => {
            const search = value.search
            const categories = value.categories
            const URLSearch = new URLSearchParams('')
            categories.forEach(element => {
                URLSearch.append('category', element)
            });
            if(search != null && search != '')
            URLSearch.set('search', search)
            return URLSearch.toString()
        },
        [searchParams]
    )

    /*useEffect(() => {
        fetchData();
    }, []);*/

    const handleCheckboxChange = (id) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(categoryId => categoryId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    useEffect(() => {
        if (selectedCategories.length > 0) {
            handleChangeSelect(selectedCategories);
        }
    }, [selectedCategories]);

    /*const fetchData = async () => {
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
            throw error
            setError(error.message);
            setLoading(false);
        }
    };*/

    const handleChangeSelect = async (ids, search = '') => {
        const params = { categories: ids, search: search };
        router.push('/?' + createQueryString(params));
    };

    const handleSearchButtonClick = () => {
        handleChangeSelect(selectedCategories, searchText);
    };

    return (
        <>
            <InputGroup >
                <DropdownButton
                    variant="outline-secondary"
                    title={'Select categories'}
                    id="input-group-dropdown-1"
                >
                    {categories.map(item =>
                        <Item
                            key={item.id}
                            item={item}
                            handleCheckboxChange={handleCheckboxChange}
                            checked={selectedCategories.includes(item.id)}
                        />
                    )}
                </DropdownButton>
                <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={handleSearchButtonClick}>
                    Search
                </Button>
            </InputGroup>

        </>
    );
}