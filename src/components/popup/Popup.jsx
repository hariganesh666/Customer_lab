import React, { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { AiOutlineMinus } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";
import "./popup.scss";
function Popup({ datas, setDatas }) {
  const [show, setShow] = useState(false);

  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [addSchema, setAddSchema] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddSchema = (e) => {
    const selectedSchema = datas.find(
      (schema) => schema.value === e.target.value
    );

    if (selectedSchema) {
      setSchemas([...schemas, selectedSchema]);
      setDatas(datas.filter((schema) => schema.value !== e.target.value));
    }
  };

  const handleRemoveSchema = (index) => {
    const removedSchema = schemas[index];
    setSchemas(schemas.filter((_, i) => i !== index));
    const overAlData = [...datas];
    overAlData.unshift(removedSchema);
    const dataSort = overAlData.sort((a, b) => a.id - b.id);
   
    setDatas(dataSort);
  };

  const handleRemoveData = () => {
    // if (schemas.length > 0) {
    //   const removedSchema = schemas[schemas.length - 1];
    //   setSchemas(schemas.slice(0, -1));
    //   setDatas([...datas, removedSchema]);
    // }
    setAddSchema(false)
  };

  const handleSubmit = () => {
    const schemName = [];

    for (let a of schemas) {
      const datas = {
        [a.label]: a?.label,
      };
      schemName.push(datas);
    }

    let datas = {
      segment_name: segmentName,
      schema: schemName,
    };

    console.log(datas, "datas");
  };

  return (
    <div>
        <div className="container">
        <Button
        className="save-btn"
        variant="light"
        style={{ border: "2px solid white" }}
        onClick={handleShow}
      >
        Save Segment
      </Button>
        </div>
     
      <Offcanvas
        style={{ width: "30%" }}
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header className="header-container">
          <Offcanvas.Title>
            <div className="d-flex">
              <MdKeyboardArrowLeft
                className="mt-2 icon-arrow-left"
                onClick={handleClose}
              />
              <div className="ms-1 mt-1 para-heading">Saving Segment</div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter the Name of the Segment</Form.Label>
              <Form.Control
                type="text"
                value={segmentName}
                placeholder="Name of the Segment"
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </Form.Group>
            <div>
              To save your segment, you need to add the schemas to build the
              query
            </div>
            <div className="mt-3 d-flex justify-content-end w-100">
              <div className="d-flex trails-user">
                <div className="mt-2 circle-1"></div>
                <div className="ms-1">- User Trails</div>
              </div>
              <div className="d-flex trails-group">
                <div className="mt-2 circle-2"></div>
                <div className="ms-1">- Group Trails</div>
              </div>
            </div>

            <div className="mt-2 schema-container-1">
              {schemas?.length === 0 ? (
                <div className="p-3"></div>
              ) : (
                schemas?.map((schema, i) => (
                  <React.Fragment key={i}>
                    <div className="d-flex mt-2">
                      <div className="mt-3 schema-inside-container"></div>
                      <Form.Select
                        className="w-75 ms-3"
                        value={schema.value}
                        onChange={handleAddSchema}
                      >
                        <option value={schema.value}>{schema.value}</option>
                      </Form.Select>
                      <div
                        className="ms-3 remove-box-1"
                        onClick={() => handleRemoveSchema(i)}
                      >
                        <AiOutlineMinus
                          onClick={() => handleRemoveSchema(i)}
                          className="w-100 mt-1 remove-box-icon-1"
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ))
              )}
            </div>

            {addSchema && (
              <div className="mt-3 p-1">
                <div className="d-flex">
                  <div className="mt-3 add-schema-container-1"></div>
                  <Form.Select
                    className="w-75 ms-3"
                    value=""
                    onChange={handleAddSchema}
                  >
                    <option>Add schema to segment</option>
                    {datas?.map((item, index) => (
                      <option
                        key={index}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>

                  <div
                    className="ms-3 remove-add-schema"
                    onClick={handleRemoveData}
                  >
                    <AiOutlineMinus
                      className="w-100 mt-1 remove-box-icon-2"
                      onClick={handleRemoveData}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-2 Add-schema" onClick={() => setAddSchema(true)}>
              + Add new schema
            </div>
          </div>
        </Offcanvas.Body>
        <div className="offcanvas-footer">
          <Button className="save-btn" onClick={handleSubmit}>
            Save the Segment
          </Button>
          <Button
            className="ms-4 cls-btn"
            variant="light"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Offcanvas>
    </div>
  );
}

export default Popup;
