import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { Popconfirm, Spin, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { mangxahoiData, removemangxahoi, updatemangxahoi } from './mangxahoiSlice';
import { QuestionCircleOutlined } from '@ant-design/icons';
function Mangxahoi() {
    const match = useRouteMatch()

    const columns = [
        {
            title: 'Mạng xã hội',
            dataIndex: 'name',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
        },
        {
            title: 'Màu',
            dataIndex: 'color',
        },

        {
            title: 'Link',
            dataIndex: 'link',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action'
        }
    ];
    const mangxahois = useSelector(state => state.mangxahois.mangxahoi.data);
    const loading = useSelector(state => state.mangxahois.loading)
    const dispatch = useDispatch();
    const actionResult = async () => { await dispatch(mangxahoiData()) }
    const history = useHistory()
    const hangdleDelete = e => {
        dispatch(removemangxahoi(e));
        setTimeout(() => {
            actionResult();
        }, 500);
    }
    const hangdleEdit = (id) => {
        history.replace(`${match.url}/suamangxahoi/${id}`)
    }
    const handleStatus = (e, id) => {
        if (e === 1) {
            dispatch(updatemangxahoi({ status: 0, idsua: id }))
        } else {
            dispatch(updatemangxahoi({ status: 1, idsua: id }))
        }
        setTimeout(() => {
            actionResult();
        }, 500);
    }
    return (
        <div id="admin">
            <div className="heading">
                <h4>Mạng xã hội</h4>
                <div className="hr"></div>
            </div>
            <div className="content">
                <div className="add">
                    <Link to={`${match.url}/themmangxahoi`}>
                        <Button variant="outlined" color="secondary"><i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm mới</Button>
                    </Link>
                </div>
                {loading ? <div className="spin"><Spin className="mt-5" /></div> :
                    <Table columns={columns} dataSource={mangxahois.map((ok, index) => (
                        {
                            key: index + 1,
                            name: <span>{ok.name}</span>,
                            icon: <span className={`${ok.icon}`} style={{ fontSize: "1.5rem", color: ok.color }}></span>,
                            color: <span>{ok.color}</span>,
                            link: <span>{ok.link}</span>,
                            status: <div className="action">{ok.status === 1 ? <span onClick={() => { handleStatus(ok.status, ok.id) }}><i className="far fa-thumbs-up text-primary"></i></span> : <span onClick={() => handleStatus(ok.status, ok.id)}><i className="far fa-thumbs-down "></i></span>}</div>,
                            action:
                                <div className="action">
                                    <Popconfirm title="Bạn có muốn sửa？" onConfirm={() => { hangdleEdit(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}>
                                        <i className="far fa-edit mr-4"></i>
                                    </Popconfirm>
                                    <Popconfirm title="Bạn có muốn xoá？" onConfirm={() => { hangdleDelete(ok.id) }} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                        <i className="far fa-trash-alt" ></i>
                                    </Popconfirm>
                                </div>
                        }))} />
                }
            </div>
        </div>

    )
}

Mangxahoi.propTypes = {

}

export default Mangxahoi