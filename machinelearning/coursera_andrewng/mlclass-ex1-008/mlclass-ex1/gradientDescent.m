function [theta, J_history] = gradientDescent(X, y, theta, alpha, num_iters)
%GRADIENTDESCENT Performs gradient descent to learn theta
%   theta = GRADIENTDESENT(X, y, theta, alpha, num_iters) updates theta by 
%   taking num_iters gradient steps with learning rate alpha

% Initialize some useful values
m = length(y); % number of training examples
J_history = zeros(num_iters, 1);

for iter = 1:num_iters

    % ====================== YOUR CODE HERE ======================
    % Instructions: Perform a single gradient step on the parameter vector
    %               theta. 
    %
    % Hint: While debugging, it can be useful to print out the values
    %       of the cost function (computeCost) and gradient here.
    %

    %This will generate vector for errors based on theta. It will generate a m * 1 matrix
    diffVector = X*theta - y;

    %This is the variable to store the diff vector transpose multiplied by X. This will generate 1 * n matrix.
    diffVectorX = diffVector' * X;

    %Transpose for the above generated vector. This will generate n * 1 matrix
    diffVectorXTranspose = diffVectorX';
    delta = (diffVectorXTranspose./m);

    %Updated theta vector
    theta = theta - alpha * delta ;
    % disp(J_history(iter));

    % ============================================================

    % Save the cost J in every iteration    
    J_history(iter) = computeCost(X, y, theta);

    
end

%disp(sprintf('final theta %0.6f',theta))
end
