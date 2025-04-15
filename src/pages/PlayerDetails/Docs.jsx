/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Container } from 'reactstrap';
import { useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import {
    CreatedAt,
    // Email,
    // EmailVerified,
    // KycLevel,
    PlayerId,
    PlayerStatus,
    // Status,
    UserName,
} from './TableCol';
import { getDateTime } from '../../helpers/dateFormatter';
import { getUserDocument } from '../../network/getRequests';

// eslint-disable-next-line react/prop-types
const Docs = ({ userId }) => {
    const dispatch = useDispatch();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!userId) return;
            setIsLoading(true);
            try {
                const response = await getUserDocument({
                    limit: itemsPerPage,
                    pageNo: currentPage,
                    userId,
                });

                // console.log("API Response:", response?.data?.data?.userDocument?.rows);

                setDocuments(response?.data?.data?.userDocument?.rows || []);
                setTotalCount(response?.data?.data?.userDocument?.count || 0);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
            setIsLoading(false);
        };

        fetchDocuments();
    }, [currentPage, itemsPerPage, userId]);

    const formattedDocuments = useMemo(() => {
        return documents.map((doc) => ({
            ...doc,
            documentId: doc.userDocumentId ?? '-',
            documentType: doc.documentType ?? '-',
            signature: doc.signature ?? '-',
            documentUrl: doc.documentUrl ?? '#',
            createdAt: getDateTime(doc.createdAt),
        }));
    }, [documents]);

    const onChangeRowsPerPage = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Document Id',
                accessor: 'userDocumentId',
                filterable: true,
                Cell: ({ cell }) => <PlayerId value={cell.value} />,
            },
            // {
            //     Header: 'Preview',
            //     accessor: 'documentUrl',
            //     filterable: true,
            //     Cell: ({ cell }) => (
            //         <a href={cell.value} target="_blank" rel="noopener noreferrer">
            //             View Document
            //         </a>
            //     ),
            // },
            {
                Header: 'Document Type',
                accessor: 'documentType',
                filterable: true,
                disableSortBy: true,
                // Cell: ({ cell }) => <PlayerStatus value={cell.value} />,
            },
            {
                Header: 'Signature',
                accessor: 'signature',
                // Cell: ({ cell }) => <PlayerStatus value={cell.value} />,
            },
            {
                Header: 'Status',
                accessor: 'status',
                // Cell: ({ cell }) => <PlayerStatus value={cell.value} />,
            },
            {
                Header: 'Created At',
                accessor: 'createdAt',
                Cell: ({ cell }) => <CreatedAt value={cell.value} />,
            },
        ],
        []
    );

    return (
        <Container fluid>
            <Card className="p-2">
                <TableContainer
                    isLoading={isLoading}
                    columns={columns}
                    data={formattedDocuments}
                    isPagination
                    customPageSize={itemsPerPage}
                    tableClass="table-bordered align-middle nowrap mt-2"
                    totalPageCount={totalCount}
                    isManualPagination
                    onChangePagination={setCurrentPage}
                    currentPage={currentPage}
                    changeRowsPerPageCallback={onChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
};

export default Docs;
