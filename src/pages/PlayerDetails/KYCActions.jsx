/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const KYCActionButtons = ({ cell, handleStatus }) => {
	const status = cell?.row?.original?.status;
	const userIdForKyc = cell?.row?.original?.userId;
	const userDocumentId = cell?.row?.original?.userDocumentId;
	const documentLabelId = cell?.row?.original?.documentLabelId;
	const kycDocLevel = cell?.row?.original?.level;
  const userKycLevel = cell?.row?.original?.User?.level;

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
        {userKycLevel !== 1 && userKycLevel > kycDocLevel ?
          null :
          status !== 1 ? (
            <Link
              to="#"
              className="btn btn-sm btn-soft-success"
              onClick={() => {
                handleStatus({
                  userDocumentId,
                  status: 'approved',
                  Message: 'Accept',
                  kycDocLevel,
                  userIdForKyc,
                });
              }}
            >
              <i
                className="mdi mdi-check-circle"
                id={`inactivetooltip-${documentLabelId}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`inactivetooltip-${documentLabelId}`}
              >
                Accept
              </UncontrolledTooltip>
            </Link>
          ) : (
            <Link
              to="#"
              className="btn btn-sm btn-soft-danger"
              onClick={() => {
                handleStatus({
                  userDocumentId,
                  status: 'rejected',
                  Message: 'Rejected',
                  kycDocLevel,
                  userIdForKyc,
                });
              }}
            >
              <i
                className="mdi mdi-close-thick"
                id={`activetooltip-${documentLabelId}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`activetooltip-${documentLabelId}`}
              >
                Reject
              </UncontrolledTooltip>
            </Link>
          )
        }

			</li>
		</ul>
	);
};

KYCActionButtons.propTypes = {
	handleStatus: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default KYCActionButtons;
