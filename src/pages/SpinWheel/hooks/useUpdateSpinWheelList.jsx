/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useMemo, useState } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';

import {
    getInitialValues,
    staticFormFields,
    validationSchema,
} from '../formDetails';
import {
    editSpinWheelListFail,
    editSpinWheelListStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { Id, GC, SC, Priority, UserLimit, IsAllow } from '../SpinWheelListCol';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { editSpinWheelList } from '../../../network/putRequests';
import { showToastr } from '../../../utils/helpers';

const PRIORITY_MAP = {
    1: 'Rarely',
    2: 'Sometimes',
    3: 'Usually',
    4: 'Frequently',
};

const PRIORITY_REVERSE_MAP = {
    'Rarely': 1,
    'Sometimes': 2,
    'Usually': 3,
    'Frequently': 4,
};

const useUpdateSpinWheelList = ({ fetchData }) => {
    const dispatch = useDispatch();
    const { isGranted, permissions } = usePermission();
    const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });

    const { spinWheelList, isEditSpinWheelLoading, isEditSpinWheelListSuccess } =
        useSelector((state) => state.SpinWheelList);

    const handleEditWheelList = async (values) => {
        try {
            const response = await editSpinWheelList({
                ...values,
                priority: PRIORITY_REVERSE_MAP[values.priority] || values.priority, // Convert back to ID
                wheelDivisionId: isEdit.selectedRow.wheelDivisionId,
            });
            setIsOpen(false);
            showToastr({
                message: `Spin Wheel List Updated Successfully`,
                type: 'success',
            });
            setTimeout(() => fetchData(), 500);
        } catch (error) {
            showToastr({
                message: error?.response?.data?.errors[0]?.description || error.message,
                type: 'error',
            });
        }
    };

    const {
        isOpen,
        setIsOpen,
        header,
        validation,
        formFields,
        setFormFields,
        setHeader,
    } = useForm({
        header: 'Edit Spin Wheel Configuration',
        initialValues: getInitialValues(),
        validationSchema,
        staticFormFields,
        onSubmitEntry: handleEditWheelList,
    });

    const buttonList = useMemo(() => []);

    const onClickEdit = (selectedRow) => {
        setIsEdit({ open: true, selectedRow });
        setHeader('Edit Spin Wheel Configuration');
        validation.setValues({
            ...getInitialValues(selectedRow),
            priority: PRIORITY_MAP[selectedRow.priority] || selectedRow.priority, // Convert ID to Name
        });
        setIsOpen((prev) => !prev);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'wheelDivisionId',
                accessor: 'wheelDivisionId',
                Cell: ({ cell }) => <Id value={cell.value} />,
            },
            {
                Header: 'GC',
                accessor: 'gc',
                Cell: ({ cell }) => <GC value={cell.value} />,
            },
            {
                Header: 'SC',
                accessor: 'sc',
                Cell: ({ cell }) => <SC value={cell.value} />,
            },
            {
                Header: 'Priority',
                accessor: 'priority',
                Cell: ({ cell }) => {
                    return (
                        <Priority 
                            value={PRIORITY_MAP[cell.value] || cell.value} 
                        />
                    );
                },
            },
            {
                Header: 'Action',
                accessor: 'action',
                disableSortBy: true,
                disableFilters: true,
                Cell: ({ cell }) => {
                    const id = cell?.row?.original?.wheelDivisionId;
                    return (
                        <Button
                            className="btn btn-md btn-soft-info"
                            onClick={(e) => {
                                e.preventDefault();
                                onClickEdit(cell?.row?.original);
                            }}
                        >
                            <i className="mdi mdi-pencil-outline" id={`aggregator-${id}`} />
                            <UncontrolledTooltip placement="top" target={`aggregator-${id}`}>
                                Edit
                            </UncontrolledTooltip>
                        </Button>
                    );
                },
            },
        ],
        [permissions]
    );

    return {
        isOpen,
        setIsOpen,
        header,
        validation,
        formFields,
        setFormFields,
        columns,
        isEditSpinWheelLoading,
        buttonList,
    };
};

export default useUpdateSpinWheelList;
