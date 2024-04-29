import React from 'react'
import baseUrl from '../utils/axios';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function DeliveryPerson() {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Delivery Person" />
    </DefaultLayout>
  )
}
