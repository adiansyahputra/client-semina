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
import { deleteData } from '../../utils/fetch';
import { notifActions } from '../../redux/notif/notifSlice';
import SelectBox from '../../components/SelectBox';
import {
  fetchListCategories,
  fetchListSpeakers,
} from '../../redux/lists/listsActions';

function EventPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const events = useSelector((state) => state.events);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.category, events.speaker]);

  useEffect(() => {
    dispatch(fetchListSpeakers());
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
            message: `berhasil hapus speaker ${res.data.data.name}`,
          })
        );

        dispatch(fetchEvents());
      }
    });
  };

  return (
    <Container>
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
            value={events.categories}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) =>
              dispatch(
                eventsActions.setCategory({
                  category: e,
                })
              )
            }
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian pembicara'}
            name="speaker"
            value={events.speaker}
            options={lists.speakers}
            isClearable={true}
            handleChange={(e) =>
              dispatch(
                eventsActions.setTalent({
                  talent: e,
                })
              )
            }
          />
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={events.status}
        thead={['Judul', 'Tanggal', 'Tempat', 'Kategori', 'Pembicara', 'Aksi']}
        data={events.data}
        tbody={['title', 'date', 'venueName', 'categoryName', 'talentName']}
        editUrl={`/events/edit`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default EventPage;
