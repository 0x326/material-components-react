FAB example:

    <FAB iconName="favorite" ariaLabel="Favorite"></FAB>

Mini FAB:

    <FAB iconName="favorite" ariaLabel="Favorite" mini></FAB>

Plain FAB:

    <FAB iconName="favorite" ariaLabel="Favorite" plain></FAB>

FAB with custom SVG logo:

    // This file contains modified code from the original version
    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    <FAB>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    </FAB>

FAB with absolute positioning:

    <FAB id="FAB" iconName="favorite" ariaLabel="Favorite" position={{
      bottom: '1rem',
      right: '1rem',
      condition: 'min-width: 1024px',
      condBottom: '3rem',
      condRight: '5rem'
    }} />
