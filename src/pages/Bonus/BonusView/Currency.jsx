/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Card, Col, Row } from 'reactstrap';
import { CustomInputField } from '../../../helpers/customForms';
import { bonusEnableCurrencies, convertAmountOptions } from '../constants';

const Currencies = ({ bonusDetail }) => {
	useEffect(() => {}, []);

	return (
		<Card className="p-3">
			{bonusDetail &&
				bonusDetail?.currency &&
				Object.keys(bonusDetail?.currency).length > 0 &&
				Object.keys(bonusDetail?.currency).map((key, index) => {
          if(!bonusEnableCurrencies?.[bonusDetail?.bonusType]?.includes(key)) return;
          return (
            <Row>
              <Col className="mb-3">
                <CustomInputField
                  label={'Currency'}
                  value={key}
                  disabled
                />
              </Col>
              {Object.keys(bonusDetail?.currency[key]).map(
                (currKey, currIndex) => {
                  let hide = false;
                  if (bonusDetail?.bonusType === 'wagering') {
                    hide =
                      currKey === 'minDeposit' ||
                      currKey === 'maxBonusThreshold' ||
                      currKey === 'maxWinAmount';
                  } else if (bonusDetail?.bonusType === 'joining') {
                    hide = currKey !== 'joiningAmount';
                  } else if (
                    bonusDetail?.bonusType === 'freespins' ||
                    bonusDetail?.bonusType === 'cashfreespins'
                  ) {
                    hide =
                      currKey !== 'maxWinAmount' &&
                      currKey !== 'zeroOutThreshold';
                  } else if (
                    bonusDetail?.bonusType === 'deposit'
                  ) {
                    hide =
                      !['1', '2', '3', '4', '5'].includes(currKey);
                  } else {
                    hide =
                      currKey === 'joiningAmount' || currKey === 'minBalance';
                  }

                  return (
                    currKey !== 'minBonusThreshold' &&
                    !hide && (
                      <Col
                        className="px-1 text-center"
                        key={`currencyCols ${currIndex + 1}`}
                        hidden={hide}
                      >
                        {!hide && (
                          <label htmlFor={currKey} style={{ fontSize: '14px' }}>
                            {['depositCashback', 'wagering'].includes(
                              bonusDetail?.bonusType
                            )
                              ? convertAmountOptions?.find((val) =>
                                  currKey === 'minBalance'
                                    ? val.value === 'minBalanceCash'
                                    : val.value === currKey
                                )?.label
                              : convertAmountOptions?.find(
                                  (val) => val.value === currKey
                                )?.label}
                            <span className="text-danger"> *</span>
                          </label>
                        )}
                        <CustomInputField
                          name={`[${key}][${currKey}]`}
                          value={bonusDetail?.currency[key][currKey]}
                          hidden={hide}
                          type="number"
                          disabled
                        />
                      </Col>
                    )
                  );
                }
              )}
            </Row>
				)})}
		</Card>
	);
};

Currencies.defaultProps = {};
export default Currencies;
