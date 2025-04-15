/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ActionButtons from "../ActionButtons";
import { AdminUserID, FullName, UserName } from "../AdminsListCol";
import { modules } from "../../../constants/permissions";
import { getAllRole } from "../../../network/getRequests";

const useRoleList = ({
    setAdminDetails,
    setIsEdit,
    setEditDetails,
    isCreate, setIsCreate }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [rolesListData, setRolesListData] = useState()

    const [page, setPage] = useState(1);
    const onChangeRowsPerPage = (value) => {
        setItemsPerPage(value);
    };

    const getAllRoles = async () => {
        setIsLoading(true)
        try {
            const respons = await getAllRole();
            setIsLoading(false)
            setRolesListData(respons?.data?.data?.adminRoles)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }


    const handleEdit = (value) => {
        setIsEdit(true);
        setEditDetails(value);
        setTimeout(() => { setIsCreate((prev) => !prev) },)
    };

    const handleView = (value) => {
        setEditDetails(value);
        setIsEdit(true);
        setIsCreate((prev) => !prev)
    }

    const columns = useMemo(
        () => [
            {
                Header: '#',
                disableFilters: true,
                filterable: true,
                disableSortBy: true,
                accessor: ({ name }) => (
                    <div className="avatar-xs">
                        <span className="avatar-title rounded-circle">
                            {
                                name?.charAt(0)}
                        </span>
                    </div>
                ),
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
                Cell: ({ cell }) => <FullName value={cell.value} />,
            },
            {
                Header: 'level',
                accessor: 'level',
                filterable: true,
                Cell: ({ cell }) => <AdminUserID value={cell.value} />,
            },



            {
                Header: 'Action',
                accessor: 'action',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ cell }) => (
                    <ActionButtons
                        handleEdit={() => handleEdit(cell.row?.original)}
                        row={cell.row}
                        handleView={() => handleView(cell.row?.original)}
                    // handleStatus={openCasinoCategoryModal}
                    />
                ),
            },
        ],
        []
    );

    const handleClick = () => {
        setTimeout(() => { setIsCreate((prev) => !prev) },)

        setIsEdit(false);
    }

    const buttonList = useMemo(() => [
        {
            label: 'Create',
            handleClick,
            link: '#',
            module: modules.Administrator,
            operation: 'C',
        },
    ]);

    useEffect(() => { getAllRoles() }, [isCreate])
    return {
        columns,
        page, setPage, itemsPerPage, isLoading,
        onChangeRowsPerPage, buttonList,
        totalAdminsCount: rolesListData?.count,
        listData: rolesListData?.rows || [],
        isCreate,
        handleClick
    }
};

useRoleList.propTypes = {};

useRoleList.defaultProps = {
    cell: PropTypes.objectOf.isRequired,
};

export default useRoleList;