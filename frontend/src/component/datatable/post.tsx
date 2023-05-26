import { GridColDef, GridValueGetterParams, DataGrid, GridRowSpacingParams } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getPosts } from '../../redux/post';
import { Box, Grid, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

const NiceMeta = styled.div`
    font-size: 0.7rem;
    background: grey;
    padding: 0px 0.2rem;
    border-radius: 5px;

`

const MetaDisplay = (props: any) => {
    return <>
        <Stack flexDirection={'column'} justifyContent={'center'}>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography sx={{ display: 'block', minWidth: '80px' }} fontSize={'0.7rem'}>
                        Facebook
                    </Typography>
                </Grid>
                <Grid item>
                    <NiceMeta>
                        {props.meta?.facebook?.likes || 0}
                    </NiceMeta>
                </Grid>
                <Grid item>
                    <NiceMeta>
                        {props.meta?.facebook?.shares || 0}
                    </NiceMeta>
                </Grid>
                <Grid item>
                    <NiceMeta>
                        {props.meta?.facebook?.comments || 0}
                    </NiceMeta>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography sx={{ display: 'block', minWidth: '80px' }} fontSize={'0.7rem'}>
                        Linkedin
                    </Typography>
                </Grid>
                <Grid item>
                    <NiceMeta>
                        {props.meta?.linkedin?.likes || 0}
                    </NiceMeta>
                </Grid>
                <Grid item>
                    <NiceMeta>
                        {props.meta?.linkedin?.shares || 0}
                    </NiceMeta>
                </Grid>
                <Grid item>
                    <NiceMeta>
                        {props.meta?.linkedin?.comments || 0}
                    </NiceMeta>
                </Grid>
            </Grid>
        </Stack>
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
        {
            field: 'content',
            headerName: 'Content',
            flex: 3,
            sortable: false,
            align: 'left',
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.content}`
            }
        },
        {
            field: 'user', headerName: 'Author', flex: 1, sortable: false,
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.user?.username}`
            }
        },
        {
            field: 'meta',
            headerName: 'Meta (Like/Share/Comment)',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <MetaDisplay meta={params.row.meta} />
            )
        },
    ];

    const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
        return {
            top: 0,
            bottom: 0
        };
    }, []);

    return <>
        <div style={{ width: '100%' }}>
            <DataGrid
                autoHeight
                getRowSpacing={getRowSpacing}
                getRowHeight={() => 'auto'}
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