/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import { map } from 'lodash';
import { projectName } from '../../constants/config';
import useChannelGroupsChatListing from './hooks/useChannelGroupsChatListing';
import { MESSAGES_CONSTANTS } from './formDetails';
import { humanizeUsernames } from '../../utils/helpers';
import { colorOptions } from '../../helpers/common';
import NoDataFound from '../../components/Common/NoDataFound';
import { modules } from '../../constants/permissions';
import usePermission from '../../components/Common/Hooks/usePermission';
import ChatRain from '../../assets/images/chatRain.png';
import CoinBox from '../../assets/images/coin_box.svg';
import Coin from '../../assets/images/coin.svg';

const ChannelGroupsChatList = ({ channelId }) => {
	document.title = projectName;

	const {
		groupChatMessages,
		setSearchString,
		searchString,
		fetchMoreData,
		hasMore,
		formattedGroupChatMessages,
		defaultCurrency,
		currencyById,
	} = useChannelGroupsChatListing(channelId);

	const { isGranted } = usePermission();
	const noDataFound = !groupChatMessages?.records?.length;

	return (
		<div className="w-100 user-chat ">
			<Card>
				<div className="p-4 border-bottom d-flex">
					<div className="px-3 d-flex align-items-center">
						{groupChatMessages?.group?.groupLogo ? (
							<img
								src={groupChatMessages?.group?.groupLogo}
								alt="Group Logo"
								style={{ width: '50px', height: '50px' }}
							/>
						) : (
							<i className="mdi mdi-account-group font-size-20 text-primary" />
						)}
					</div>
					<div>
						<h5 className="font-size-15 mb-1">
							{groupChatMessages?.group?.name}
						</h5>
						<p
							className="text-muted mb-0"
							dangerouslySetInnerHTML={{
								__html: groupChatMessages?.group?.description,
							}}
						/>
					</div>
				</div>

				<div className="d-flex align-items-center my-2 mx-2 border rounded px-3">
					<i className="bx bx-search-alt search-icon" />
					<Input
						type="text"
						value={searchString}
						className="form-control border-0"
						placeholder="Search messages"
						onChange={(e) => setSearchString(e.target.value)}
					/>
					{searchString && (
						<i
							className="mdi mdi-close clear-icon"
							onClick={() => setSearchString('')}
						/>
					)}
				</div>

				<div
					id="scrollableDiv"
					style={{ height: '630px', overflow: 'auto' }}
					className="scrollable-container"
				>
					{noDataFound ? (
						<div style={{ textAlign: 'center' }}>
							<NoDataFound height="200px" width="300px" />
						</div>
					) : (
						<InfiniteScroll
							dataLength={groupChatMessages?.records?.length || 0}
							next={fetchMoreData}
							hasMore={hasMore}
							loader={
								<i className="fas fa-solid fa-spin font-size-22 text-muted" />
							}
							scrollableTarget="scrollableDiv"
						>
							<ul className="list-unstyled mb-0 ps-2">
								{map(
									formattedGroupChatMessages,
									(
										{
											actioneeId,
											message,
											createdAt,
											messageType,
											replyMessage,
											user,
											gif,
											isContainOffensiveWord,
											sharedEvent,
											recipientUser,
										},
										idx
									) => {
										const randomColor =
											colorOptions?.[idx % (colorOptions?.length || 1)];
										return (
											<li key={actioneeId}>
												<div className="d-flex align-items-start mb-2 p-3 gap-3">
													<div className="avatar-xs">
														<span
															className={`avatar-title p-3 rounded-circle font-size-14 ${randomColor}`}
														>
															{user?.username?.charAt(0)?.toUpperCase()}
														</span>
													</div>

													<div>
														<div className="d-flex gap-2">
															{isGranted(modules.player, 'R') ? (
																<Link to={`/player-details/${user?.id}`}>
																	<span className="font-weight-bold font-size-15 text-primary">
																		{user?.username}
																	</span>
																</Link>
															) : (
																<span className="font-weight-bold font-size-15 text-primary">
																	{user?.username}
																</span>
															)}
															{createdAt && (
																<p className="mb-0">
																	<span className="text-muted">
																		{moment(createdAt).format('lll')}
																	</span>
																</p>
															)}
														</div>

														<div>
															{replyMessage && (
																<div
																	style={{ borderLeft: '4px solid #ccc' }}
																	className="p-3 pe-5 rounded bg-light bg-opacity-50"
																>
																	<div className="d-flex gap-2">
																		<span className="font-weight-bold font-size-16 text-primary">
																			{replyMessage?.user?.username}
																		</span>
																		{createdAt && (
																			<p className="mb-0">
																				<span className="text-muted">
																					{moment(createdAt).format('lll')}
																				</span>
																			</p>
																		)}
																	</div>
																	{replyMessage?.messageType ===
																		MESSAGES_CONSTANTS.message && (
																			<p className="font-size-14 mt-2 mb-0">
																				{humanizeUsernames(replyMessage?.message)}
																			</p>
																		)}
																</div>
															)}
														</div>

														{messageType === MESSAGES_CONSTANTS.message && (
															<div>
																{isContainOffensiveWord && (
																	<p
																		className="text-danger font-weight-bold mb-1"
																		style={{ marginBottom: '2px' }}
																	>
																		This message content Offensive Words
																	</p>
																)}
																<p className={`font-size-13 mt-2 mb-0`}>
																	{humanizeUsernames(message)}
																</p>
															</div>
														)}

														{messageType === MESSAGES_CONSTANTS.gif && (
															<img
																src={gif}
																alt="GIF"
																className="mt-2 rounded"
																style={{
																	maxWidth: '100px',
																	maxHeight: '100px',
																}}
															/>
														)}
														{messageType === MESSAGES_CONSTANTS.chatRain && (
															<div className="chat-rain-message d-flex mt-2 p-1">
																<div className="mt-2">
																	<img
																		src={ChatRain}
																		alt="Event"
																		className="rounded"
																	/>
																</div>
																<div className="mt-2">
																	<h5 className="font-weight-bold text-center">
																		Lucky Win!
																	</h5>
																	<p className="font-weight-bold text-center">
																		Just won {sharedEvent.eventTitle}
																	</p>
																	<div className="chat-rain-amount d-flex align-items-center justify-content-center">
																		<div className="coin-container">
																			<div className="coin-wrapper">
																				<img
																					src={Coin}
																					alt="Coin"
																					className="coin-icon"
																				/>
																				<span className="coin-amount">{`${sharedEvent?.eventAmount ?? 'NA'
																					} ${sharedEvent?.amountCurrency
																						? currencyById[
																							sharedEvent?.amountCurrency
																						]?.symbol ?? 'NA'
																						: defaultCurrency?.symbol ?? 'NA'
																					}`}</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														)}

														{messageType === MESSAGES_CONSTANTS.tip && (
															<div className="tip-message d-flex mt-2 align-items-center">
																<div className="tip-text mt-2 ml-4">
																	<h6 className="font-weight-bold">
																		Hey! I Tipped
																	</h6>
																	<div className="recipient">
																		@{recipientUser?.username ?? 'NA'}
																	</div>
																	<div className="with-text">With</div>
																	<div className="tipped-amount">
																		Tipped:{' '}
																		{`${sharedEvent?.eventAmount ?? 'NA'} ${sharedEvent?.amountCurrency
																			? currencyById[
																				sharedEvent?.amountCurrency
																			]?.symbol ?? 'NA'
																			: defaultCurrency?.symbol ?? 'NA'
																			}`}
																	</div>
																</div>
																<div className="tip-image mt-0">
																	<img
																		src={CoinBox}
																		alt="Event"
																		className="rounded coin-box"
																	/>
																</div>
															</div>
														)}
													</div>
												</div>
											</li>
										);
									}
								)}
							</ul>
						</InfiniteScroll>
					)}
				</div>
			</Card>
		</div>
	);
};

ChannelGroupsChatList.propTypes = {
	channelId: PropTypes.string.isRequired,
};

export default ChannelGroupsChatList;
