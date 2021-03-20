# FrontEnd
 ## User Management & Role Management
  1. ~~Create user~~
  2. ~~Create role~~
  3. ~~Create tree view for roles~~
  4. ~~Route created for user, role and tree view~~




# Backend
 ## User Management
   1. Create default role presets as below
    1.1 Ghost role (Licensing Role)
    1.2 CEO
    1.3 Manager
    1.4 Admin
    1.5 Executive

Licensing / Ghost role will be available always in the db for debug purposes and won't be modified. 

2. Role Rulesets / permissions

Licensing / Ghost role - All permission
CEO                    - All permission
Manager                - Restricted permission level 1
Admin                  - Restricted permission level 2
Executive              - Restricted permission level 3

3. Custom Roles - CEO / Ghost Role can create custom roles as per requirement and screen will have restriction levels mentioned for selection


# ARCHITECTURE

1. Default roles - Licensingpartner(Lpartner), CEO, Admin, Executive, Manager

2. LicensingPartner not to show in system

3. Front End will show only Admin, CEO, Manager  when selected from "reporting to" dropdown and won't show "Executive"


