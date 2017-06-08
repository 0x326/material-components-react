ListGroup example:

    <ListGroup>
      <ListGroupSubheader text="Grocery List" />
      <List>
        <ListItem text="Apples" />
        <ListItem text="Bananas" endDetail={<Icon iconName="favorite"/>}/>
      </List>
      <ListGroupDivider />
      <ListGroupSubheader text="Messages" />
      <List twoLine>
        <ListItem text="John Doe" secondaryText="Lorem ipsum dolor sit amet" startDetail={<Icon iconName="account_circle" />} />
        <ListItem text="Jane Doe" secondaryText="sed do eiusmod tempo incididunt" startDetail={<Icon iconName="account_circle" />} />
      </List>
    </ListGroup>
