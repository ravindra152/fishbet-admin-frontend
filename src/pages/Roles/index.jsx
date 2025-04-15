/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import {
    projectName,
    tableCustomClass,
    tbodyClass,
} from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import YesNoStaffModal from './modal/YesNoStaffModal';
import useRoleList from './hooks/useRoleList';
import FormPage from '../../components/Common/FormPage';
import useActions from './hooks/useActions';

const Roles = () => {
    // meta title
    document.title = projectName;
    const {
        validation,
        leftFormFields,
        rightFormFields,
        isAddSuperUserLoading,
        customComponent,
        setAdminDetails,
        setIsEdit,
        isEdit,
        setEditDetails,
        isCreate, setIsCreate
    } = useActions();

    const { columns,
        listData,
        itemsPerPage,
        page,
        isLoading,
        buttonList,
        onChangeRowsPerPage,
        setPage,
        totalAdminsCount,
        handleClick,
    } = useRoleList({
        setAdminDetails,
        setIsEdit,
        setEditDetails,
        isCreate, setIsCreate
    });



    return (
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col lg="12">
                        <Card>
                            {isCreate ? <CardBody>
                                <CrudSection title={<div style={{ cursor: 'pointer' }}
                                    onClick={handleClick} aria-hidden="true" >Back</div>} />
                                <FormPage
                                    formTitle={`${isEdit ? 'Edit' : 'Add'} new Role`}
                                    validation={validation}
                                    leftFormFields={leftFormFields}
                                    rightFormFields={rightFormFields}
                                    submitLabel="Submit"
                                    customColClasses=""
                                    customComponent={customComponent}
                                    isSubmitLoading={isAddSuperUserLoading}
                                />
                            </CardBody> : <> <CrudSection 
                            buttonList={buttonList} 
                            title="Roles" /><CardBody>

                                <TableContainer
                                    columns={columns || []}
                                    data={listData}
                                    isGlobalFilter
                                    isPagination
                                    customPageSize={itemsPerPage}
                                    tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
                                    tbodyClass={tbodyClass}
                                    paginationDiv="justify-content-center"
                                    pagination="pagination justify-content-start pagination-rounded"
                                    totalPageCount={totalAdminsCount}
                                    isManualPagination
                                    onChangePagination={setPage}
                                    currentPage={page}
                                    isLoading={isLoading}
                                    changeRowsPerPageCallback={onChangeRowsPerPage}
                                />
                            </CardBody></>}
                        </Card>
                    </Col>
                </Row>
                {/* <YesNoStaffModal
                    show={modalStates.activeYesNoStaffModal}
                    handleYes={handleStatus}
                    handleClose={() => closeModal('activeYesNoStaffModal')}
                    content={`Are you sure you want to update status
                as ${adminData?.Message ?? ''} ? `}
                /> */}
            </Container>
        </div>
    );
};

Roles.propTypes = {
    // t: PropTypes.func,
};

Roles.defaultProps = {
    // t: (string) => string,
};

export default Roles;
