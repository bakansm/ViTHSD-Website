import {
	Box,
	Card,
	CardActions,
	CardContent,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function HistoryCard() {
	const [start, setStart] = useState(0);
	const [data, setData] = useState(undefined);

	useEffect(() => {
		const fetchData = async () => {
			let config = {
				method: 'get',
				maxBodyLength: Infinity,
				url: `https://vithsd-backend.vercel.app/api/youtube/comment?start=${start}`,
				headers: {
					'Content-Type': 'application/json',
				},
			};

			await axios
				.request(config)
				.then((response) => {
					const array = [];
					for (let i of response.data) {
						array.push({
							...i,
							timestamp: new Date(
								i.timestamp
							).toLocaleString(),
						});
					}
					setData(array);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		fetchData();
	}, [start]);

	const onNextClick = () => {
		setStart(start + 10);
	};

	const onPrevClick = () => {
		if (start >= 10) {
			setStart(start - 10);
		} else setStart(0);
	};

	return (
		<Card>
			<CardContent>
				<Box>
					<Typography>History</Typography>
				</Box>
				<Box
					borderRadius={'1rem'}
					border={'1px solid black'}
					overflow={'hidden'}>
					{data &&
						data.map((field) => (
							<Box
								key={field._id}
								padding={'1rem'}
								display={'flex'}
								alignItems={'center'}
								border={'1px solid #cacaca'}>
								<Box
									marginRight={'1rem'}
									color={'gray'}>
									<Typography>
										{field.timestamp}
									</Typography>
								</Box>
								<Divider
									orientation='vertical'
									flexItem
								/>
								<Box
									marginLeft={'1rem'}
									flexGrow={1}
									display={'flex'}
									flexDirection={'row'}
									justifyContent={
										'space-between'
									}>
									<Typography
										maxWidth={'50rem'}
										flexWrap={'wrap'}
										textAlign={
											'center'
										}>
										{field.content}
									</Typography>
									<Typography>
										{field.predict}
									</Typography>
								</Box>
							</Box>
						))}
				</Box>
			</CardContent>
			<CardActions disableSpacing>
				<Box
					width={'100%'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'flex-end'}>
					<IconButton onClick={onPrevClick}>
						<ArrowLeftIcon />
					</IconButton>
					<IconButton onClick={onNextClick}>
						<ArrowRightIcon />
					</IconButton>
				</Box>
			</CardActions>
		</Card>
	);
}
