import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/Breadcrumb';
import SButton from '../../components/Button';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { eventsActions } from '../../redux/events/eventsSlice';
import { fetchEvents } from '../../redux/events/eventsActions';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData, putData } from '../../utils/fetch';
import { notifActions } from '../../redux/notif/notifSlice';
import SelectBox from '../../components/SelectBox';
import {
  fetchListCategories,
  fetchListTalents,
} from '../../redux/lists/listsActions';

function EventPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const events = useSelector((state) => state.events);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.category, events.talent]);

  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/events/${id}`);

        dispatch(
          notifActions.setNotif({
            status: true,
            typeNotif: 'success',
            message: `berhasil hapus talent ${res.data.data.title}`,
          })
        );

        dispatch(fetchEvents());
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Ubah Status',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusEvent: status === 'Published' ? 'Draft' : 'Published',
        };
        const res = await putData(`/cms/events/${id}/status`, payload);

        dispatch(
          notifActions.setNotif({
            status: true,
            typeNotif: 'success',
            message: `berhasil ubah status event ${res.data.data.title}`,
          })
        );

        dispatch(fetchEvents());
      }
    });
  };

  return (
    <Container className="mt-3">
      <BreadCrumb textSecound={'Events'} />
      <div className="mb-3">
        <SButton action={() => navigate('/events/create')}>Tambah</SButton>
      </div>
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            query={events.keyword}
            handleChange={(e) =>
              dispatch(
                eventsActions.setKeyword({
                  keyword: e.target.value,
                })
              )
            }
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian kategori'}
            name="category"
            value={events.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => {
              dispatch(
                eventsActions.setCategory({
                  category: e,
                })
              );
            }}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian pembicara'}
            name="talents"
            value={events.talent}
            options={lists.talents}
            isClearable={true}
            handleChange={(e) => {
              dispatch(
                eventsActions.setTalent({
                  talent: e,
                })
              );
            }}
          />
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={events.status}
        thead={[
          'Judul',
          'Tanggal',
          'Tempat',
          'Status',
          'Kategori',
          'Pembicara',
          'Aksi',
        ]}
        data={events.data}
        tbody={[
          'title',
          'date',
          'venueName',
          'statusEvent',
          'categoryName',
          'talentName',
        ]}
        editUrl={`/events/edit`}
        deleteAction={(id) => handleDelete(id)}
        customAction={(id, status = '') => {
          return (
            <SButton
              className={'mx-2'}
              variant="primary"
              size={'sm'}
              action={() => handleChangeStatus(id, status)}
            >
              Change Status
            </SButton>
          );
        }}
        withoutPagination
      />
    </Container>
  );
}

export default EventPage;
