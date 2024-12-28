import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import TitleIcon from '@mui/icons-material/Title';
import Modal from '../Layouts/Modal';
import './Filter.scss';

const FilterInput = (props) => {
    const { label, icon, value, updater } = props;
    return <TextField
        label={label}
        variant="outlined"
        size="small"
        fullWidth
        value={value}
        onChange={updater}
        slotProps={{
            input: { endAdornment: <InputAdornment position="end">{icon}</InputAdornment> }
        }}
    />
};

export default function Filter(props) {

    const { loaded, filtered, handleUpdate } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);

    const [filterCount, setFilterCount] = useState(0);
    const [titleInput, setTitleInput] = useState("");
    const [authorInput, setAuthorInput] = useState("");
    const handleTitleInput = (e) => setTitleInput(e.target.value);
    const handleAuthorInput = (e) => setAuthorInput(e.target.value);

    const availableFilters = [
        {
            label: "Title",
            field: "title",
            icon: <TitleIcon />,
            value: titleInput,
            updater: handleTitleInput
        },
        {
            label: "Author",
            field: "author",
            icon: <PersonIcon />,
            value: authorInput,
            updater: handleAuthorInput
        }
    ];

    useEffect(() => {
        window.addEventListener("scroll", stickyFilter);
        return () => {
            window.removeEventListener("scroll", stickyFilter);
        };
    }, []);

    useEffect(() => {
        let count = 0;
        availableFilters.forEach(filter => { if (!!filter.value) count++; });
        setFilterCount(count);
    }, [modalOpen]);

    const stickyFilter = (e) => {
        const filterWrapper = document.querySelector(".filter-wrapper");
        const scrollTop = window.scrollY;
        scrollTop >= 110 ? filterWrapper.classList.add("stuck") : filterWrapper.classList.remove("stuck");
    };

    const applyFilters = (e) => {
        e.preventDefault();
        handleUpdate({
            title: titleInput,
            author: authorInput,
        });
        setModalOpen(false);
    }

    const clearFilters = (e) => {
        e.preventDefault();
        setTitleInput("");
        setAuthorInput("");
    }

    return <React.Fragment>

        {modalOpen && <Modal>

            <div className="filter-form">
                <Box component="form" className="form-wrapper">
                    <h3>Document Filters</h3>
                    {availableFilters.map((object, index) => <FilterInput
                        key={index}
                        label={object.label}
                        icon={object.icon}
                        value={object.value}
                        updater={object.updater}
                    />)}
                    <div className="buttons">
                        <div>
                            <button onClick={toggleModal} className="inverse">C L O S E</button>
                            <button onClick={clearFilters} className="inverse">C L E A R</button>
                        </div>
                        <div><button onClick={applyFilters}>A P P L Y</button></div>
                    </div>
                </Box>
            </div>

        </Modal>}

        <div className="filter-wrapper">
            <div className="filter-bar">
                <div className="filter-text">
                    {(loaded === filtered)
                        ? <React.Fragment>
                            {`${loaded} Documents Loaded`}
                        </React.Fragment>
                        : <React.Fragment>
                            {`${filtered} Documents (${loaded - filtered} Filtered)`}
                        </React.Fragment>
                    }
                </div>
                <div className="filter-button">
                    {(filterCount > 0) && <strong>{filterCount}</strong>}
                    <IconButton size="large" onClick={toggleModal} sx={{ color: "#fff" }}>
                        <FilterListIcon />
                    </IconButton>
                </div>
            </div>
        </div>

    </React.Fragment>

}