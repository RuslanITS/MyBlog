import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import axiosApi from "../../api/fairbase";

type ContactsData = {
  email: string;
  telegram: string;
  phone: string;
};

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactsData | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosApi.get("/contacts.json");

        setContacts(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchContacts();
  }, []);

  if (!contacts) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <Card.Title className="display-6">
          Contacts
        </Card.Title>

        <hr />

        <div className="fs-5">
          <p>
            <strong>Email:</strong> {contacts.email}
          </p>

          <p>
            <strong>Telegram:</strong> {contacts.telegram}
          </p>

          <p>
            <strong>Phone:</strong> {contacts.phone}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Contacts;