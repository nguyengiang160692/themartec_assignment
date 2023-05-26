import { GridColDef, GridValueGetterParams, DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getPosts } from '../../redux/post';
import { Grid, Stack, Typography } from '@mui/material';

const MetaDisplay = (props: any) => {
    return <>
        <Grid container spacing={2}>
            <Grid item>
                <Typography>
                    Likes: {props.meta?.facebook?.likes}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Comments: {props.meta?.facebook?.comments}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Shares: {props.meta?.facebook?.shares}
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item>
                <Typography>
                    Likes: {props.meta?.linkedin?.likes}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Comments: {props.meta?.linkedin?.comments}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Shares: {props.meta?.linkedin?.shares}
                </Typography>
            </Grid>
        </Grid>
    </>
}

const PostTable = () => {
    const dispatch = useAppDispatch()
    const postStore = useAppSelector(state => state.post)

    const [currentPage, setCurrentPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(10)

    useEffect(() => {
        dispatch(getPosts(currentPage, pageSize))
    }, [])

    const columns: GridColDef[] = [
        { field: 'content', headerName: 'Content', flex: 3, sortable: false, },
        {
            field: 'user', headerName: 'Author', flex: 1, sortable: false,
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.user?.username}`
            }
        },
        {
            field: 'meta',
            headerName: 'Meta',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <MetaDisplay meta={params.row.meta} />
            )
        },
    ];

    return <>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowId={(row) => row._id}
                rows={postStore.posts}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: currentPage, pageSize: pageSize },
                    },
                }}
                rowCount={postStore.totalCount}
                pageSizeOptions={[5, 10]}
                onPaginationModelChange={(params) => {
                    console.log(params);

                    let currentPage = params.page + 1
                    setCurrentPage(currentPage)
                    setPageSize(params.pageSize)
                    dispatch(getPosts(currentPage, params.pageSize))
                }}
            />
        </div>
    </>
}

export default PostTable