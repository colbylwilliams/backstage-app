// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useMutation, useQueryClient } from 'react-query';
import { Project } from 'teamcloud';
import { api, onResponse } from '../api';

export const useDeleteProject = () => {

    const queryClient = useQueryClient();

    return useMutation(async (project: Project) => {
        const result = await api.deleteProject(project.id, project.organization, {
            onResponse: onResponse
        });
        return result
    }, {
        onSuccess: (_data, project) => {
            queryClient.setQueryData(['org', project?.organization, 'project', project?.id], undefined)
            queryClient.invalidateQueries(['org', project?.organization, 'projects'])

            // navigate(`/orgs/${org?.slug ?? orgId}/projects/${project?.slug ?? projectId}/components/${component?.slug}`);
        }
    }).mutateAsync
}