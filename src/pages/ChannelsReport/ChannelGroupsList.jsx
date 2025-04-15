/* eslint-disable */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Nav, NavItem, UncontrolledTooltip } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { projectName } from '../../constants/config';
import useChannelGroupsList from './hooks/useChannelGroupsList';
import { colorOptions } from '../../helpers/common';
import Spinners from '../../components/Common/Spinner';
import NoDataFound from '../../components/Common/NoDataFound';

const ChannelGroupsList = ({ channelId }) => {
	document.title = projectName;
	const {
		channelUserDetail,
		isLoadingChannelUserDetail,
		handleBanPlayer,
		loadingUsers,
		setSearchString,
		searchString,
		userTab,
		setUserTab,
		fetchMoreData,
		hasMore,
	} = useChannelGroupsList(channelId);

	const noDataFound = !channelUserDetail?.users?.length;


	return (
		<div className="mt-4">
			<h5 className="ps-4 pb-3 border-bottom">
				<i className="fas fa-user-friends me-2 font-size-15 text-primary" />
				Channel Members
			</h5>

			<div className="d-flex align-items-center my-2 mx-0 border rounded px-3 ">
				<i className="bx bx-search-alt search-icon" />
				<Input
					type="text"
					value={searchString}
					className="form-control border-0 me-2"
					placeholder="Search by Name"
					onChange={(e) => setSearchString(e.target.value)}
				/>
				{searchString && (
					<i
						className="mdi mdi-close clear-icon"
						onClick={() => setSearchString('')}
					/>
				)}
			</div>
			<Nav
				pills
				justified
				role="presentation"
				className="mb-2 me-2 border rounded"
			>
				{[
					{ value: 'all', label: 'All' },
					{ value: 'unban', label: 'Active' },
					{ value: 'ban', label: 'Banned' },
				].map(({ value, label }) => (
					<NavItem key={value || label}>
						<NavLink
							to="javascript:void(0)"
							className={`${value === userTab ? 'active' : ''} nav-link`}
							onClick={() => {
								setUserTab(value);
							}}
						>
							<span className="d-sm-block">{label}</span>
						</NavLink>
					</NavItem>
				))}
			</Nav>

			{isLoadingChannelUserDetail ? (
				<Spinners />
			) : noDataFound ? (
				<div style={{ textAlign: 'center' }}>
					<NoDataFound height="200px" width="300px" />
				</div>
			) : (
				<InfiniteScroll
					dataLength={channelUserDetail?.users?.length || 0}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={
						<i className="fas fa-solid fa-spin font-size-22 text-muted" />
					}
					scrollableTarget="scrollable-container"
				>
					<div
						style={{
							maxHeight: '580px',
							overflowY: 'auto',
						}}
						id="scrollable-container"
						className="scrollable-container"
					>
						{channelUserDetail?.users?.map((user) => {
							const randomColor =
								colorOptions?.[user?.userId % (colorOptions?.length || 1)];
							return (
								<div
									key={user?.userId}
									className="d-flex align-items-center justify-content-between pe-2 rounded bg-light bg-opacity-50 mb-2 me-2"
								>
									<div className="d-flex align-items-center p-3 gap-3">
										<div className="avatar-xs">
											<span
												className={`avatar-title p-3 rounded-circle font-size-14 ${randomColor} text-${randomColor}`}
											>
												{user?.firstName?.charAt(0)?.toUpperCase() || "U"}
											</span>
										</div>
										<span className="font-size-14">
											{`${user?.firstName || "UserName"} ${user?.lastName|| ""}`}
										</span>
									</div>

									<div
										id={`ban-player-${user?.userId}`}
										onClick={() =>
											!loadingUsers[user?.userId] &&
											handleBanPlayer(
												user?.userId,
												user?.userChatGroups?.[0]?.isBanned
											)
										}
										style={{ cursor: 'pointer' }}
									>
										{loadingUsers[user?.userId] ? (
											<i className="fas fa-spinner fa-spin font-size-22 text-muted" />
										) : (
											<i
												className={`mdi mdi-account-cancel font-size-22 ${user?.userChatGroups?.[0]?.isBanned
													? 'text-danger'
													: 'text-primary'
													}`}
											/>
										)}
										<UncontrolledTooltip
											placement="top"
											target={`ban-player-${user?.userId}`}
										>
											{user?.userChatGroups?.[0]?.isBanned
												? ' Set Unbanned Player'
												: 'Set Banned Player'}
										</UncontrolledTooltip>
									</div>
								</div>
							);
						})}
					</div>
				</InfiniteScroll>
			)}
		</div>
	);
};

export default ChannelGroupsList;
