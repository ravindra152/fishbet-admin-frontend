/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
	Button,
	Card,
	Col,
	// Dropdown,
	// DropdownItem,
	// DropdownMenu,
	// DropdownToggle,
	Row,
	Spinner,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useUserOverview from './hooks/useUserOverview';
import DisableReason from './modals/DisableReason';
import YesNoModal from './modals/YesNoModal';
import InternalModal from './modals/InternalModal';
import KycLevel from './modals/KycLevel';
import AffiliateCommisionModal from './modals/AffiliateCommisionModal';
import { showToastr } from '../../utils/helpers';

import {
	markUserAsInternal,
	sendPasswordReset,
	updateSAUserStatus,
	verifyUserEmail,
	updateuserkyclevel,
} from '../../store/actions';
import { updateAffiliateCommisionStart } from '../../store/globalSetting/actions';
import ManageTagModal from './modals/ManageTagModal';
import Duplicates from './modals/Duplicates';
// import GiveBonusModal from './modals/GiveBonus';
import ManageMoney from './modals/ManageMoney';
import UpdateUserInfo from './modals/UpdateUserInfo';
import ResetUserPassword from './modals/ResetUserPassword';
import { modules } from '../../constants/permissions';
import usePermission from '../../components/Common/Hooks/usePermission';
import SendEmail from './modals/SendEmail';
import PlayerWallet from './PlayerWallet';
import Limits from './Limits';

const ColumnContainer = ({ hidden, children }) => (
	<Col xs={12} md={6} className="text-center mb-2" hidden={hidden}>
		{children}
	</Col>
);

const Overview = ({ userDetails, userDetailsLoading, duplicateUsers }) => {
	const { isGranted } = usePermission();
	const dispatch = useDispatch();
	const { playerId } = useParams();
	// const [openResetMenu, setOpenResetMenu] = useState(false);
	const [modalStates, setModalStates] = useState({
		internalModal: false,
		activeInactiveModal: false,
		verifyEmailModal: false,
		manageTagModal: false,
		duplicatesModal: false,
		giveBonusModal: false,
		editUserModal: false,
		resetPasswordEmail: false,
		resetUserPassword: false,
		sendEmailModal: false,
		kycLevelModal: false,
		affiliateCommisionModal: false,

	});
	const openModal = (modalName) => {
		if (modalName === 'kycLevelModal' && userDetails?.level === 0) {
			showToastr({
				message:
					'Please verify user email in order to proceed with User KYC Level Update.',
				type: 'error',
			});
			setModalStates((prev) => ({ ...prev, [modalName]: false }));
		} else if (
			modalName === 'affiliateCommisionModal' &&
			!userDetails?.affiliateStatus
		) {
			showToastr({
				message: 'Affiliate commision can be set for affiliate users only',
				type: 'warning',
			});
			setModalStates((prev) => ({ ...prev, [modalName]: false }));
		} else {
			setModalStates((prev) => ({ ...prev, [modalName]: true }));
		}
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

	const {
		basicInfo,
		moreInfo
		// kycInfo
	} = useUserOverview({
		user: userDetails,
	});

	const updateUserStatus = (values) => {
		dispatch(
			updateSAUserStatus({
				...values,
				code: 'USER',
				userId: playerId,
				status: !userDetails.isActive,
			})
		);
	};
	const updateUserKycLevel = (values) => {
		dispatch(
			updateuserkyclevel({
				level: Number(values.kyclevel),
				userId: Number(playerId),
			})
		);
	};
	const handleAffiliateCommision = (values) => {
		dispatch(updateAffiliateCommisionStart(values));
	};

	const handleInternalChange = (userInternalStatus) => {
		dispatch(
			markUserAsInternal({
				userId: playerId,
				userInternalStatus,
			})
		);
	};

	const handleVerifyEmail = () => {
		dispatch(
			verifyUserEmail({
				isTenant: false,
				userId: parseInt(playerId, 10),
			})
		);
	};

	const handleSendResetPasswordEmail = () => {
		dispatch(
			sendPasswordReset({
				userId: parseInt(playerId, 10),
			})
		);
	};

	return (
		<div>
			{userDetailsLoading ? (
				<Spinner
					color="primary"
					className="position-absolute top-50 start-50"
				/>
			) : (
				<Row>
					<Col xs={12} lg={4} className="col-padding">
						<Card className="card-overview">
							<h4 className="h4-overview text-center mt-3">
								Basic Info <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								{basicInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
										? ''
										: (label === 'Reason' && value
												? true
												: label !== 'Reason') && (
												<div
													key={label}
													className="d-flex justify-content-between m-1"
												>
													<h6 className="px-2">{label}</h6>
													<span className={`${subValue} px-2`}>
														{value || ' '}
													</span>
												</div>
										  )
								)}
							</div>
						</Card>
					</Col>
					<Col xs={12} lg={4} className="col-padding">
					    <Card className="card-overview">
							<h4 className="h4-overview text-center mt-3">
								More Info <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								{moreInfo?.map(({ label, value, subValue }) =>
									<div
										key={label}
										className="d-flex justify-content-between m-1"
									>
										<h6 className="px-2">{label}</h6>
										<span className={`${subValue} px-2`}>
											{value || ' '}
										</span>
									</div>
								)}
							</div>
						</Card>
						<Card className="p-2">
							<h4 className="h4-overview text-center mt-3">
								Account Actions <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								<Row>
									{isGranted(modules.Players, 'T') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant={
													userDetails?.isActive
														? 'outline-danger'
														: 'outline-success'
												}
												onClick={() => openModal('activeInactiveModal')}
											>
												{userDetails && userDetails?.isActive
													? 'In-Active'
													: 'Active'}
											</Button>
										</ColumnContainer>
									)}
									{isGranted(modules.Players, 'U') && (
										<ColumnContainer>
											{userDetails && userDetails?.isInternalUser ? (
												<Button
													className="actionButton w-100"
													variant="outline-warning"
													onClick={() => openModal('internalModal')}
												>
													Remove as Internal
												</Button>
											) : (
												<Button
													className="actionButton w-100"
													variant="outline-warning"
													onClick={() => openModal('internalModal')}
												>
													Mark as Internal
												</Button>
											)}
										</ColumnContainer>
									)}
									{/* {(isGranted(modules.Players, 'EV') ||
										userDetails?.isEmailVerified) && (
										<ColumnContainer hidden={userDetails?.isEmailVerified}>
											<Button
												className="actionButton w-100"
												variant="outline-success"
												onClick={() => openModal('verifyEmailModal')}
											>
												Verify Email
											</Button>
										</ColumnContainer>
									)} */}
									{/* <ColumnContainer>
										<Button
											variant="outline-warning"
											onClick={() => openModal('manageTagModal')}
											className="actionButton w-100"
										>
											Manage Tag
										</Button>
									</ColumnContainer> */}
									<ColumnContainer>
										<Button
											variant="outline-secondary"
											onClick={() => openModal('duplicatesModal')}
											className="actionButton w-100"
										>
											Duplicates ({duplicateUsers?.count})
										</Button>
									</ColumnContainer>
									{isGranted(modules.Players, 'U') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-success"
												onClick={() => openModal('manageMoneyModal')}
											>
												Manage Money
											</Button>
										</ColumnContainer>
									)}
									<ColumnContainer hidden>
										{userDetails?.trackingToken &&
											userDetails?.isAffiliateUpdated === false && (
												<Button
													className="actionButton w-100"
													variant="outline-success"
													// onClick={() => setShowAddAffiliate(prev => true)}
												>
													Add Affiliate
													{/* {addUserAffiliateLoading && ( */}
													<Spinner
														as="span"
														animation="border"
														role="status"
														aria-hidden="true"
													/>
													{/* )} */}
												</Button>
											)}
									</ColumnContainer>
									{/* <ColumnContainer hidden>
										{userDetails?.trackingToken &&
											userDetails?.isAffiliateUpdated &&
											userDetails?.affiliateStatus && (
												<Button
													className="actionButton w-100"
													variant="outline-danger"
													onClick={() => setShowRemoveAffiliate(true)}
												>
													Remove Affiliate
													{updateUserAffiliateLoading && (
													<Spinner
														as="span"
														animation="border"
														role="status"
														aria-hidden="true"
													/>
													)}
												</Button>
											)}
									</ColumnContainer> */}
									{isGranted(modules.Players, 'U') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-warning"
												onClick={() => openModal('editUserModal')}
											>
												Edit User Info
											</Button>
										</ColumnContainer>
									)}
									{/* {isGranted(modules.Players, 'UP') && (
										<ColumnContainer>
											<Dropdown
												isOpen={openResetMenu}
												toggle={() => setOpenResetMenu((prev) => !prev)}
											>
												<DropdownToggle
													id="dropdown-autoclose-outside"
													className="actionButton w-100"
													variant="outline-success"
												>
													Reset Password
												</DropdownToggle>

												<DropdownMenu className="dropdown-menu-end">
													<DropdownItem
														onClick={() => openModal('resetPasswordEmail')}
													>
														Send Email
													</DropdownItem>
													<DropdownItem
														onClick={() => openModal('resetUserPassword')}
													>
														Reset Password
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</ColumnContainer>
									)} */}
									{/* {isGranted(modules.EmailTemplate, 'U') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-warning"
												onClick={() => openModal('sendEmailModal')}
											>
												Send Email
											</Button>
										</ColumnContainer>
									)} */}
									{/* {isGranted(modules.KYC, 'U') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-warning"
												onClick={() => openModal('kycLevelModal')}
											>
												KYC Level
											</Button>
										</ColumnContainer>
									)} */}
									{/* {isGranted(modules.Affiliates, 'U') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-warning"
												onClick={() => openModal('affiliateCommisionModal')}
											>
												Affiliate Commission
											</Button>
										</ColumnContainer>
									)} */}
								</Row>
							</div>
						</Card>
					</Col>
					
					<Col xs={12} lg={4} className="col-padding">
						<PlayerWallet userDetails={userDetails} />
						<Limits  userId={userDetails?.userId} />
					</Col>
					

					
					{/* <Col xs={12} lg={4} className="col-padding">
						<Card className="card-overview">
							<h4 className="h4-overview text-center mt-3">
								Other Info <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								<h5 className="px-2 mx-1">
									Contact Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								{contactInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
										? ''
										: (label === 'Reason' && value
												? true
												: label !== 'Reason') && (
												<div
													key={label}
													className="d-flex justify-content-between m-1"
												>
													<h6 className="px-2 overview-leftlabel">{label}</h6>
													<span className={`${subValue} px-2`}>
														{value || ' '}
													</span>
												</div>
										  )
								)} */}

					{/* <h5 className="px-2 mx-1 mt-2">
									Affiliate Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								<div className="d-flex justify-content-between m-1">
									<h6 className="px-2 overview-leftlabel">Affiliate Token</h6>
									<span className="px-2">
										{userDetails?.trackingToken || ' '}
									</span>
								</div>
								<div className="d-flex justify-content-between m-1">
									<h6 className="px-2 overview-leftlabel">Affiliate Status</h6>
									{userDetails?.affiliateStatus ? (
										<span className="text-success px-2">Linked</span>
									) : (
										<span className="text-danger px-2">Not Linked</span>
									)}
								</div>

								<h5 className="px-2 mx-1 mt-2">
									KYC Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								{kycInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
										? ''
										: (label === 'Reason' && value
												? true
												: label !== 'Reason') && (
												<div
													key={label}
													className="d-flex justify-content-between m-1"
												>
													<h6 className="px-2 overview-leftlabel">{label}</h6>
													<span className={`${subValue} px-2`}>
														{value || ' '}
													</span>
												</div>
										  )
								)} */}
					{/* </div>
						</Card>
					</Col> */}
					{userDetails?.isActive ? (
						<DisableReason
							userData={userDetails}
							show={modalStates.activeInactiveModal}
							markUserStatusInactive={updateUserStatus}
							handleClose={() => closeModal('activeInactiveModal')}
							name={`${userDetails?.firstName ?? 'Player'} ${
								userDetails?.lastName ?? ''
							} (${userDetails?.email ?? ''})`}
						/>
					) : (
						<YesNoModal
							show={modalStates.activeInactiveModal}
							handleYes={updateUserStatus}
							handleClose={() => closeModal('activeInactiveModal')}
							content={`Are you sure you want to mark user ${
								userDetails?.firstName ?? ''
							} ${userDetails?.lastName ?? ''} (${userDetails?.email ?? ''}) ${
								userDetails?.isActive ? 'In-Active' : 'Active'
							}?`}
						/>
					)}
					<InternalModal
						userData={userDetails}
						show={modalStates.internalModal}
						handleClose={() => closeModal('internalModal')}
						handleYes={handleInternalChange}
					/>
					<YesNoModal
						show={modalStates.verifyEmailModal}
						handleClose={() => closeModal('verifyEmailModal')}
						handleYes={handleVerifyEmail}
						content={`Do you really want to mark user ${
							userDetails?.firstName ?? ''
						} ${userDetails?.lastName ?? ''} (${
							userDetails?.email ?? ''
						}) as Verified?`}
					/>
					<ManageTagModal
						show={modalStates.manageTagModal}
						userDetails={userDetails}
						handleClose={() => closeModal('manageTagModal')}
					/>
					<Duplicates
						show={modalStates.duplicatesModal}
						toggle={() => closeModal('duplicatesModal')}
						header="Duplicates"
					/>
					<ManageMoney
						show={modalStates.manageMoneyModal}
						toggle={() => closeModal('manageMoneyModal')}
						header={`Manage Money for user ${userDetails?.firstName ?? ''} ${
							userDetails?.lastName ?? ''
						}`}
					/>
					<UpdateUserInfo
						show={modalStates.editUserModal}
						toggle={() => closeModal('editUserModal')}
						header={`Update user ${userDetails?.username ?? ''} ${
							userDetails?.lastName ?? ''
						} ${userDetails?.email ?? ''} Info`}
						userDetails={userDetails}
					/>
					<YesNoModal
						show={modalStates.resetPasswordEmail}
						handleClose={() => closeModal('resetPasswordEmail')}
						handleYes={handleSendResetPasswordEmail}
						content={`Send Password Reset Email to user ${
							userDetails?.firstName ?? ''
						} ${userDetails?.lastName ?? ''} (${userDetails?.email})`}
					/>
					<ResetUserPassword
						show={modalStates.resetUserPassword}
						toggle={() => closeModal('resetUserPassword')}
						headerText={`Reset Password for user ${
							userDetails?.firstName ?? ''
						} ${userDetails?.lastName ?? ''} (${userDetails?.email ?? ''})`}
					/>
					<SendEmail
						show={modalStates.sendEmailModal}
						toggle={() => closeModal('sendEmailModal')}
						header={`Send Email to user ${userDetails?.firstName ?? ''} ${
							userDetails?.lastName ?? ''
						}`}
						user={userDetails}
					/>

					<KycLevel
						show={modalStates.kycLevelModal}
						updateUserKycLevel={updateUserKycLevel}
						handleClose={() => closeModal('kycLevelModal')}
						name={`${userDetails?.firstName ?? 'Player'} ${
							userDetails?.lastName ?? ''
						} (${userDetails?.email ?? ''})`}
						user={userDetails}
					/>
					<AffiliateCommisionModal
						show={modalStates.affiliateCommisionModal}
						handleAffiliateCommision={handleAffiliateCommision}
						handleClose={() => closeModal('affiliateCommisionModal')}
						name={`${userDetails?.firstName ?? 'Player'} ${
							userDetails?.lastName ?? ''
						} (${userDetails?.email ?? ''})`}
						user={userDetails}
					/>
				</Row>
			)}
		</div>
	);
};

export default Overview;
