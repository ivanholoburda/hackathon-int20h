{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<x-backpack::menu-item title="Quests" icon="la la-question" :link="backpack_url('quest')" />
<x-backpack::menu-item title="Questions" icon="la la-question" :link="backpack_url('question')" />
<x-backpack::menu-item title="Rooms" icon="la la-question" :link="backpack_url('room')" />
<x-backpack::menu-item title="Room participants" icon="la la-question" :link="backpack_url('room-participant')" />
<x-backpack::menu-item title="Users" icon="la la-question" :link="backpack_url('user')" />
<x-backpack::menu-item title="User histories" icon="la la-question" :link="backpack_url('user-history')" />