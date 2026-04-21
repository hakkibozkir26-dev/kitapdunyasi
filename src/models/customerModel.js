/**
 * customerModel.js - Müşteri ve Adres Zinciri Çözümleme.
 * SAP FK: Address -> Street -> City -> State -> Country.
 */
import { sap_data } from './data.js';
import { getBaseData, saveData } from './crudModel.js';
import { generateId } from '../utils/idGenerator.js';

const KEY = 'kd_customers';

export const getCustomers = () => getBaseData(KEY, sap_data.customers);

export const createCustomer = (data) => {
    const list = getCustomers();
    const newId = generateId(list, 'MU');
    const newItem = { ...data, id: newId };
    saveData(KEY, [...list, newItem]);
    return newItem;
};

export const updateCustomer = (id, data) => {
    const list = getCustomers();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) return null;
    const updated = [...list];
    updated[index] = { ...data, id };
    saveData(KEY, updated);
    return updated[index];
};

export const deleteCustomer = (id) => {
    const list = getCustomers().filter(c => c.id !== id);
    saveData(KEY, list);
};

export const resolveAddressChain = (addressId) => {
    const addr = sap_data.addresses.find(a => a.id === addressId);
    if (!addr) return 'Adres bulunamadı';

    const street = sap_data.streets.find(s => s.id === addr.streetId);
    const city = sap_data.cities.find(c => c.id === street?.cityId);
    const state = sap_data.states.find(s => s.id === city?.stateId);
    const country = sap_data.countries.find(c => c.id === state?.countryId);

    return {
        full: `${street.name} No: ${addr.houseNo} D: ${addr.flatNo}, ${city.name} / ${state.name} / ${country.name}`,
        details: { addr, street, city, state, country }
    };
};

export const getFullCustomer = (id) => {
    const cust = getCustomers().find(c => c.id === id);
    if (!cust) return null;
    return {
        ...cust,
        address: resolveAddressChain(cust.addressId)
    };
};
