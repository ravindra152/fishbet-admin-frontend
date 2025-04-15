/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import bonus from '../../../assets/images/bonus.webp';
// import useBonusdetails from '../hooks/useBonusDetails';


const GeneralDetails = ({ bonusDetails }) => (
	<>
		<Row>
			<Col lg={4} xl={2}>
				<Card className="p-3 h-90">
					<img
						className="img-thumbnail"
						width="200px"
						src={bonusDetails.imageUrl ? bonusDetails.imageUrl : bonus}
						alt="img"
					/>
				</Card>
			</Col>
			<Col lg={4} xl={5}>
				<Card className="p-3 h-90">
					<Row>
						<Col>
							<h6 className="text-nowrap font-weight-bold">Promotion Title:</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.promotionTitle || '-'}</p>
						</Col>
					</Row>
					
					<Row>
						<Col>
							<h6 className="text-nowrap font-weight-bold">GC Games</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.gcAmount || '-'}</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<h6 className="text-nowrap font-weight-bold">SC Games</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.scAmount || '-'}</p>
						</Col>
					</Row><Row>
						<Col>
							<h6 className="text-nowrap font-weight-bold">Status</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.status || '-'}</p>
						</Col>
					</Row>
					{/* <Row>
						<Col>
							<h6 className="font-weight-bold text-nowrap">Referral Code:</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.referralCode || '-'}</p>
						</Col>
					</Row> */}
					{/* <Row>
						<Col>
							<h6 className="font-weight-bold text-nowrap">Promo Code</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.promoCode || '-'}</p>
						</Col>
					</Row> */}
					
					
					{bonusDetails?.minDeposit && (
						<Row>
							<Col>
								<h6 className="font-weight-bold text-nowrap">
									Minimum Deposit
								</h6>
							</Col>
							<Col>
								<p>{bonusDetails?.minDeposit || '-'}</p>
							</Col>
						</Row>
					)}
					{/* {bonusDetails?.bonusType !== BONUS_TYPES.JOINING && (
            <>
              <Row>
                <Col sm={4}>
                  <h6 className="font-weight-bold text-nowrap">Valid From:</h6>
                </Col>
                <Col>
                  <p>{moment(bonusDetails?.validFrom).format(YMDFormat)}</p>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <h6 className="font-weight-bold text-nowrap">Valid To:</h6>
                </Col>
                <Col>
                  <p>{moment(bonusDetails?.validTo).format(YMDFormat)}</p>
                </Col>
              </Row>
            </>
          )} */}
					{/* <Row>
            <Col>
              <h6 className="text-nowrap font-weight-bold">Segments:</h6>
            </Col>
            <Col>
              {gameBonusSegment?.length > 0 &&
                gameBonusSegment?.map((tagId) => (
                  <Badge className="badge-soft-secondary me-1">
                    {tagId?.tag || '-'}
                  </Badge>
                ))}
            </Col>
          </Row> */}

					{/* <Row>
              <Col>
                <h6 className="text-nowrap font-weight-bold">Valid on Days:</h6>
              </Col>
              <Col>
                {daysLabels?.map((day, idx) => (
                  <Col
                    key={day}
                    className="d-flex"
                    style={{
                      verticalAlign: 'middle',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <p>{day}</p>
                    {`${bonusDetails?.validOnDays}`?.[idx] && (
                      <div
                        className="rounded-circle mt-2 mx-2"
                        style={{
                          width: '10px',
                          height: '10px',
                          background: '#1aa509',
                        }}
                      />
                    )}
                  </Col>
                ))}
              </Col>
            </Row> */}
				</Card>
			</Col>
			<Col lg={4} xl={5}>
				<Card className="p-3 h-90">
					<Row>
						<Col>
							<h6 className="font-weight-bold text-nowrap">Bonus Type:</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.bonusType?.toUpperCase()}</p>
						</Col>
					</Row>

					<Row>
						<Col>
							<h6 className="text-nowrap font-weight-bold">Bonus Id</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.id || '-'}</p>
						</Col>
					</Row>

					{bonusDetails?.maxBonusLimit && bonusDetails?.bonusType !== 'welcome' && (
						<Row>
							<Col>
								<h6 className="font-weight-bold text-nowrap">Percent</h6>
							</Col>
							<Col>
							<p>{bonusDetails?.percentage ? `${bonusDetails.percentage}%` : '0%'}</p>

							</Col>
						</Row>
					)}
					{bonusDetails?.maxBonusLimit && bonusDetails?.bonusType !== 'welcome' && (
						<Row>
							<Col>
								<h6 className="font-weight-bold text-nowrap">Maximum bonus</h6>
							</Col>
							<Col>
								<p>{bonusDetails?.maxBonusLimit || '-'}</p>
							</Col>
						</Row>
					)}
					{/* {bonusDetails?.gcAmount && ( */}
						{/* <Row> */}
							{/* <Col> */}
								{/* <h6 className="font-weight-bold text-nowrap">Number Of Free Spin Offerred</h6> */}
							{/* </Col> */}
							{/* <Col> */}
								{/* <p>{bonusDetails?.gcAmount || '-'}</p> */}
								{/* 50 */}
							{/* </Col> */}
						{/* </Row> */}
					{/* )} */}
					{/* {bonusDetails?.scAmount && (
						<Row>
							<Col>
								<h6 className="font-weight-bold text-nowrap">SC Amount</h6>
							</Col>
							<Col>
								<p>{bonusDetails?.scAmount || '-'}</p>
							</Col>
						</Row>
					)} */}
					{/* <Row>
						<Col>
							<h6 className="font-weight-bold text-nowrap">Minimum Purchase</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.minPurchase}</p>
						</Col>
					</Row> */}

					{/* <Row>
            <Col>
              <h6 className="font-weight-bold text-nowrap">
                Wagering Type:
              </h6>
            </Col>
            <Col>
              <p>
                {
                  wageringRequirementType?.find(
                    (val) =>
                      val.value === bonusDetails?.wageringRequirementType
                  )?.label
                }
              </p>
            </Col>
          </Row> */}
					{/* <Row>
						<Col>
							<h6 className="font-weight-bold text-nowrap">
								Wagering Multiplier :
							</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.wagerMultiplier}</p>
						</Col>
					</Row> */}

					{/* <Row>
						<Col>
							<h6 className="font-weight-bold text-nowrap">Days To Clear:</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.daysToClear}</p>
						</Col>
					</Row> */}
					{/* {bonusDetails?.bonusType === BONUS_TYPES.FREESPINS && (
					<Row>
						<Col>
							<h6 className="font-weight-bold text-nowrap">Bet Level:</h6>
						</Col>
						<Col>
							<p>{bonusDetails?.other?.betLevel}</p>
						</Col>
					</Row>
				)} */}
					{bonusDetails?.claimedCount > 0 && (
						<Row>
							<Col>
								<h6 className="font-weight-bold text-nowrap">Claimed count:</h6>
							</Col>
							<Col>
								<p>{bonusDetails?.claimedCount}</p>
							</Col>
						</Row>
					)}
					{/* <Row>
              <Col>
                <h6 className="font-weight-bold text-nowrap">Show Validity:</h6>
              </Col>
              <Col>
                <Badge
                  className="mb-3"
                  bg={
                    bonusDetails?.other?.showBonusValidity ? 'success' : 'dark'
                  }
                >
                  {bonusDetails?.other?.showBonusValidity ? (
                    <i className="mdi mdi-check-outline" />
                  ) : (
                    <i className="mdi mdi-clock-outline" />
                  )}
                </Badge>
              </Col>
            </Row> */}
				</Card>
			</Col>
		</Row>
		{bonusDetails?.description ? (
			<Row>
				<Card className="p-4">
					<>
						<div>
							<h6 className="text-nowrap font-weight-bold">Description:</h6>
						</div>
						<div>{Parser(bonusDetails?.description)}</div>
					</>
				</Card>
			</Row>
		) : null}
		{bonusDetails?.termsConditions ? (
			<Row>
				<Card className="p-4">
					<>
						<div>
							<h6 className="text-nowrap font-weight-bold">
								Terms and Conditions:
							</h6>
						</div>
						<div>{Parser(bonusDetails?.termsConditions)}</div>
					</>
				</Card>
			</Row>
		) : null}
	</>
);

GeneralDetails.defaultProps = {
	bonusDetails: {},
};

GeneralDetails.propTypes = {
	bonusDetails: PropTypes.objectOf,
};

export default GeneralDetails;
